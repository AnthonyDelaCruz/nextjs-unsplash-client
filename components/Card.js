import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Img from "react-cool-img";

import { Card, Button } from "reactstrap";

export default function CardComponent({
  toggleLightBox,
  photo,
  customClassName
}) {
  return (
    <Card className={`${customClassName} my-3 my-md-1`}>
      <div className="card-image-container">
        <div className="card-image">
          <Link href={`/photo/${photo.id}`}>
            <div className="position-relative">
              <div className="card-info" />
              <Img
                style={{
                  backgroundColor: "#EAEAEA",
                  height: "400px"
                }}
                className="h-auto w-100 img img-fluid"
                src={photo.urls.small}
                alt={photo.alt_description}
                debounce={1000}
              />
            </div>
          </Link>
        </div>
        <div>
          <div className="d-flex align-items-center justify-content-between p-2">
            <div className="d-flex align-items-center">
              <Img
                className="avatar mr-2"
                src={photo.user.profile_image.small}
                alt={photo.user.username}
                debounce={1000}
              />
              <p className="m-0">{photo.user.name}</p>
            </div>
            <div className="d-flex align-items-center">
              <FaHeart /> <p className="mb-0 ml-2 likes">{photo.likes}</p>
            </div>
          </div>
          <div className="d-sm-block actions p-2">
            <Button
              onClick={toggleLightBox}
              outline
              className="gallery-btn w-100"
            >
              Gallery View
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .avatar {
          border-radius: 7px;
        }
        .likes {
          margin-top: 0.2rem;
        }
        .img {
          background-color: #f1f1f1;
        }
        .card-image {
          cursor: zoom-in;
        }
        .card-image:hover .card-info {
          opacity: 1;
        }
        .card-info {
          height: 100%;
          width: 100%;
          opacity: 0;
          background: rgba(0, 0, 0, 0.5);
          -moz-transition: all 0.5s;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
          top: 0;
          left: 0;
          position: absolute;
          color: #ffffff;
        }
        @media only screen and (max-width: 768px) {
          .card-image:hover .card-info {
            opacity: 0;
          }
        }
      `}</style>
    </Card>
  );
}

export const CardSkeleton = () => {
  return (
    <div
      className="p-2 w-100 d-flex flex-column justify-content-between"
      style={{
        backgroundColor: "#EAEAEA",
        height: "400px"
      }}
    ></div>
  );
};
