import MotionDiv from "components/MotionDiv";
import Nav from "components/Nav";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";

import { fadeIn } from "../../utils/animations";

export default function Layout({
  children,
  withOutSidebar = false,
  withOutFooter = false,
  withOutSidebarComingSoon,
}) {
  return (
    <div className="h-100">
      <Nav />
      <div className="container-fluid">
        <div className="row">
          {!withOutSidebar && (
            <Sidebar
              customClassName={`
              d-none d-md-flex flex-column justify-content-around
              ${!withOutSidebar && "col-md-3"}
                `}
            />
          )}
          <div
            className={`col-sm-12 p-0
          ${withOutSidebar ? "col-md-12" : "col-md-9"}
          ${withOutSidebarComingSoon && "withOutSidebarContainer"}
          motionDiv`}
          >
            <MotionDiv variants={fadeIn} className="h-100">
              {children}
              {!withOutFooter && <Footer />}
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
}
