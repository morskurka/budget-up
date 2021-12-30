import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="position-relative"
      style={{ background: "#ECEFF1", paddingTop: "30px" }}
    >
      <div className="container" style={{ padding: "0 30px" }}>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
            <div style={{ marginBottom: "20px" }}>
              <Link className="navbar-brand fw-bold fs-3" to="/">
                <img
                  className="pe-1"
                  style={{ maxWidth: "70px" }}
                  src="logo192.png"
                  alt=""
                />
                BudgetUp
              </Link>
            </div>
            <p className="pe-4 mb-5">
              This project is used for demonstration only. All banking
              transactions were simulated based on the Israeli CBS yearly survey
              from 2018 (most recent available)
            </p>
            <ul className="d-flex justify-content-start p-0 mb-1  list-unstyled">
              <li>
                <a
                  className="d-flex justify-content-center align-items-center me-2"
                  href="https://www.linkedin.com/in/elchanan-shuky-shukrun/"
                  style={{
                    borderRadius: "50%",
                    color: "#ffffff",
                    width: "44px",
                    height: "44px",
                    background: "rgba(47, 128, 237, 0.4)",
                    margin: "0",
                    fontSize: "20px",
                  }}
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  className="d-flex justify-content-center align-items-center me-2"
                  href="https://github.com/shuky-shukrun/budget-up"
                  style={{
                    borderRadius: "50%",
                    color: "#ffffff",
                    width: "44px",
                    height: "44px",
                    background: "rgba(47, 128, 237, 0.4)",
                    fontSize: "20px",
                  }}
                >
                  <i className="bi bi-github"></i>
                </a>
              </li>
              <li>
                <a
                  className="d-flex justify-content-center align-items-center"
                  href="https://www.linkedin.com/in/elchanan-shuky-shukrun/"
                  style={{
                    borderRadius: "50%",
                    color: "#ffffff",
                    width: "44px",
                    height: "44px",
                    background: "rgba(47, 128, 237, 0.4)",
                    margin: "0",
                    fontSize: "20px",
                  }}
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <div>
              <h6 className="fw-bold text-uppercase">User Info</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <Link
                  className="text-decoration-none"
                  to=""
                  style={{
                    color: "#585978",
                  }}
                >
                  My profile
                </Link>
              </p>
              <p>
                <Link
                  className="text-decoration-none"
                  to=""
                  style={{
                    color: "#585978",
                  }}
                >
                  Settings
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <div>
              <h6 className="fw-bold text-uppercase">Links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <Link
                  className="text-decoration-none"
                  to=""
                  style={{
                    color: "#585978",
                  }}
                >
                  Home
                </Link>
              </p>
              <p>
                <Link
                  className="text-decoration-none"
                  to=""
                  style={{
                    color: "#585978",
                  }}
                >
                  About us
                </Link>
              </p>
              <p>
                <Link
                  className="text-decoration-none"
                  to=""
                  style={{
                    color: "#585978",
                  }}
                >
                  Services
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{
                width: "60px",
                backgroundColor: "#7c4dff",
                height: "2px",
              }}
            />
            <p>
              <i className="bi bi-house-fill mr-3"></i> Ort Braude Collage,
              Karmiel
            </p>
            <p>
              <i className="bi bi-envelope-fill mr-3"></i> elnn.sh@gmail.com
            </p>
            <p>
              <i className="bi bi-envelope-fill mr-3"></i> morskurka22@gmail.com
            </p>
          </div>
        </div>
        <div
          className="pt-3 pb-1"
          style={{
            borderTop: "1px solid rgba(88, 89, 120, 0.4)",
          }}
        >
          <p
            className="text-center"
            style={{
              fontSize: "14px",
              color: "rgba(88, 89, 120, 0.6)",
            }}
          >
            © 2022 Copyright:
            <Link className="ps-1" to="" style={{ color: "inherit" }}>
              BudgetUp
            </Link>
          </p>
        </div>
        <Link
          className="d-flex justify-content-center align-items-center text-align-center position-absolute"
          style={{
            width: "45px",
            height: "45px",
            background: "#2F80ED",
            fontSize: "20px",
            color: "#ffffff",
            borderRadius: "5px",
            cursor: "pointer",
            bottom: "30px",
            right: "30px",
          }}
          to="#"
        >
          <i className="bi bi-caret-up"></i>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
