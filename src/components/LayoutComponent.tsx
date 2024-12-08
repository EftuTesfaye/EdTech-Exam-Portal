import { Link, Outlet } from "react-router-dom";

export default function LayoutComponent() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav pl-5">
                  <Link to={"/"} style={{ marginLeft: "3rem" }}>
                    PlainQuestion
                  </Link>
                  <Link to={"/grouped-question"} style={{ marginLeft: "3rem" }}>
                    Grouped-Question
                  </Link>
                  <Link to={"/direction"} style={{ marginLeft: "3rem" }}>
                    create direction
                  </Link>
                  <Link
                    to={"/view-plain-questions"}
                    style={{ marginLeft: "3rem" }}
                  >
                    View-Plain-Question
                  </Link>
                  <Link
                    to={"/view-grouped-questions"}
                    style={{ marginLeft: "3rem" }}
                  >
                    View-Grouped-Question
                  </Link>

                  <Link to={"/view-directions"} style={{ marginLeft: "3rem" }}>
                    View-Directions
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
