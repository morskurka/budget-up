const Footer = () => {
  return (
    <div>
      <footer
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        <section
          className="d-flex justify-content-between p-4 text-white"
          style={{ backgroundColor: "#21D192" }}
        >
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="text-white me-4">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="bi bi-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <a className="navbar-brand text-dark fw-bold fs-2" href="#">
                  <img
                    className="mx-2"
                    src="logo192.png"
                    alt=""
                    width="30"
                    height="24"
                  />
                  BudgetUP
                </a>
                <p className="pt-3">
                  some text some text some text some text some text some text
                  some text some text some text some text
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">services</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-dark">
                    About Us
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    Services
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-dark">
                    Home
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    My Profile
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    Settings
                  </a>
                </p>
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
                  <i className="bi bi-house-fill mr-3"></i> New York, NY 10012,
                  US
                </p>
                <p>
                  <i className="bi bi-envelope-fill mr-3"></i> info@example.com
                </p>
                <p>
                  <i className="bi bi-telephone-fill mr-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="bi bi-telephone-fil mr-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-dark p-1" href="#">
            BudgetUp.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
