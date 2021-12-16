const Footer = () => {
  return (
    <footer
      className="position-relative"
      style={{ background: "#ECEFF1", paddingTop: "30px" }}
    >
      <div className="container" style={{ padding: "0 30px" }}>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
            <div style={{ marginBottom: "20px" }}>
              <a className="navbar-brand fw-bold fs-3" href="#0">
                <img
                  className="pe-1"
                  style={{ maxWidth: "70px" }}
                  src="logo192.png"
                  alt=""
                />
                BudgetUp
              </a>
            </div>
            <p className="pe-4 mb-5">
              Bootstrap 5 UI Kit for Startup Landing Page to Build Rapid
              User-interface for your next web projects.
            </p>
            <ul className="d-flex justify-content-start p-0 mb-1 list-unstyled">
              <li>
                <a
                  className="d-flex justify-content-center align-items-center me-2"
                  href="#0"
                  style={{
                    borderRadius: "50%",
                    color: "#ffffff",
                    width: "44px",
                    height: "44px",
                    background: "rgba(47, 128, 237, 0.4)",
                    fontSize: "20px",
                  }}
                >
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  className="d-flex justify-content-center align-items-center me-2"
                  href="#0"
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
                  className="d-flex justify-content-center align-items-center me-2"
                  href="#0"
                  style={{
                    borderRadius: "50%",
                    color: "#ffffff",
                    width: "44px",
                    height: "44px",
                    background: "rgba(47, 128, 237, 0.4)",
                    fontSize: "20px",
                  }}
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  className="d-flex justify-content-center align-items-center"
                  href="#0"
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
                <a
                  className="text-decoration-none"
                  href=""
                  style={{
                    color: "#585978",
                  }}
                >
                  My profile
                </a>
              </p>
              <p>
                <a
                  className="text-decoration-none"
                  href=""
                  style={{
                    color: "#585978",
                  }}
                >
                  Settings
                </a>
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
                <a
                  className="text-decoration-none"
                  href=""
                  style={{
                    color: "#585978",
                  }}
                >
                  Home
                </a>
              </p>
              <p>
                <a
                  className="text-decoration-none"
                  href=""
                  style={{
                    color: "#585978",
                  }}
                >
                  About us
                </a>
              </p>
              <p>
                <a
                  className="text-decoration-none"
                  href=""
                  style={{
                    color: "#585978",
                  }}
                >
                  Services
                </a>
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
              <i className="bi bi-house-fill mr-3"></i> New York, NY 10012, US
            </p>
            <p>
              <i className="bi bi-envelope-fill mr-3"></i> info@example.com
            </p>
            <p>
              <i className="bi bi-telephone-fill mr-3"></i> + 01 234 567 88
            </p>
            <p>
              <i className="bi bi-telephone-fill mr-3"></i> + 01 234 567 89
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
            <a className="ps-1" href="" style={{ color: "inherit" }}>
              BudgetUp
            </a>
          </p>
        </div>
        <a
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
          href="#"
        >
          <i className="bi bi-caret-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
