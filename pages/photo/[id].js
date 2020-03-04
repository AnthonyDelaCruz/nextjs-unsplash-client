import Img from "react-cool-img";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Link from "next/link";
import Head from "next/head";
import {
  IoIosArrowRoundBack,
  IoIosEye,
  IoIosHeart,
  IoIosCloudDownload
} from "react-icons/io";
import Moment from "react-moment";

import Layout from "../../components/MainLayout";
import CollectionCards from "../../components/CollectionCards";
import Tags from "../../components/Tags";

import { axiosInstance } from "../../config";

import styles from "../../public/pageStlyes/photoDetails.css";
/**
 * @TODO
 * fix unnecessary fetch at first render that causes error
 */

export default function Photo({ id, photoDetails }) {
  const photoImgUrl = _get(photoDetails, "urls.small", "");
  const photoAltDescription = _get(
    photoDetails,
    "alt_description",
    "Unsplash Photo"
  );
  const photoDescription = _get(photoDetails, "description");
  const userName = _get(photoDetails, "user.name", "");
  const userAvatarUrl = _get(photoDetails, "user.profile_image.medium", "");
  const viewCount = _get(photoDetails, "views", 0);
  const likeCount = _get(photoDetails, "likes", 0);
  const downloadCount = _get(photoDetails, "downloads", 0);
  const updatedAtDate = _get(photoDetails, "updated_at", "");
  const tags = _get(photoDetails, "tags", []);
  const relatedCollections = _get(
    photoDetails,
    "related_collections.results",
    []
  );

  return (
    <Layout withOutSidebar>
      <Head>
        <title>{userName}</title>
        <meta
          name="description"
          content={
            photoDescription ? `${photoDescription}` : `${userName}'s photo.`
          }
        />
        <meta property="og:title" content={`${userName}`} />
        <meta
          property="og:description"
          content={
            photoDescription ? `${photoDescription}` : `${userName}'s photo.`
          }
        />
        <meta property="og:url" content={`${process.env.DOMAIN}/photo/${id}`} />
        <meta
          property="og:site_name"
          content={`${process.env.APPLICATION_NAME}`}
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:image" content={`${photoImgUrl}`} />
        <meta property="fb:app_id" content={`${process.env.FACEBOOK_APP_ID}`} />
      </Head>
      <div className="px-2 px-md-5 py-3">
        <Link href="/">
          <a className={`${styles.backToHome}`}>
            <IoIosArrowRoundBack size="1.875rem" /> Back to Home
          </a>
        </Link>
      </div>
      <div className="photo d-flex flex-column-reverse flex-md-row justify-content-md-center pt-md-5 pb-md-5 pt-sm-0">
        <div
          className={`${styles.infoSectionContainer} mt-4 mt-md-0 px-3 px-md-5`}
        >
          <div className="d-flex align-items-center info-section">
            <Img
              className="h-auto img img-fluid"
              src={userAvatarUrl}
              alt={userName}
            />
            <h3 className="mx-3 mb-0">{userName}</h3>
          </div>
          <div className="my-4 my-md-3 d-flex justify-content-between">
            <div className="mx-1 d-flex align-items-center flex-column flex-md-row">
              <div className="d-flex">
                <IoIosEye size="22px" className="mr-1 mr-md-2" />
                <span className="mr-2">Views</span>
              </div>
              {viewCount}
            </div>
            <div className="mx-1 d-flex align-items-center flex-column flex-md-row">
              <div>
                <IoIosHeart size="20px" className="mr-1 mr-md-2" />
                <span className="mr-2">Likes</span>
              </div>
              {likeCount}
            </div>
            <div className="mx-1 d-flex align-items-center flex-column flex-md-row">
              <div>
                <IoIosCloudDownload size="20px" className="mr-1 mr-md-2" />
                <span className="mr-2">Downloads</span>
              </div>
              {downloadCount}
            </div>
          </div>
          <div className="info-section mt-3">
            <div>
              <p>
                Created:{" "}
                <span className="text-muted">
                  <Moment format="YYYY/MM/DD">{updatedAtDate}</Moment>
                </span>
              </p>
            </div>
            {photoDescription && (
              <div>
                <p>
                  About the photo:{" "}
                  <span className="text-muted">{photoDescription}</span>
                </p>
              </div>
            )}
            <div>
              <p>Tags</p>
              <div>
                {tags.map(tag => (
                  <Tags title={tag.title} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 mb-md-0 text-center">
          <Img
            className="feature-photo h-auto img img-fluid"
            src={photoImgUrl}
            alt={photoAltDescription}
          />
        </div>
      </div>
      <div className={`${styles.relatedSection} text-center my-5`}>
        <h3>
          Related <span className="font-weight-bold">Collections.</span>
        </h3>
        <div className="container">
          <div className="my-5 row">
            {!_isEmpty(relatedCollections) &&
              relatedCollections.map((collection, i) => (
                <CollectionCards collection={collection} key={i} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

Photo.getInitialProps = async ({ query }) => {
  const response = await axiosInstance.get(`/photos/${query.id}`);

  return {
    id: query.id,
    photoDetails: response.data
  };
};
