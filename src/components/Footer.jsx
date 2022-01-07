import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalState";
import { useContext } from "react";

const Footer = () => {
  const { user, addUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <div className="row">
            <div className="col-md-5 col-lg-5 col-xl-5 mx-auto">
              <div className="footer-list">
                <div className="logo mb-4">
                  <a className="navbar-brand fw-bold fs-2 text-dark" href="#">
                    <i className="bi bi-coin"></i>
                    <i className="bi bi-bar-chart-steps pe-2"></i>
                    BudgetUp
                  </a>
                </div>
                <p className="desc text-white">
                  This project is used for demonstration only. All banking
                  transactions were simulated based on the Israeli CBS yearly
                  survey from 2018 (most recent available)
                </p>
                <ul className="socials list-unstyled">
                  <li>
                    <a href="https://www.linkedin.com/in/elchanan-shuky-shukrun/">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/elchanan-shuky-shukrun/">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/shuky-shukrun/budget-up">
                      <i className="bi bi-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
              <div className="footer-list">
                <h3>Links</h3>
                <hr />
                <ul className="links list-unstyled">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/">Classify Cash </Link>
                  </li>
                  <li>
                    <Link to="/">Add Income </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5 col-lg-5 col-xl-5 mx-auto">
              <div className="footer-list">
                <h3>Contact Us</h3>
                <hr />
                <ul className="links list-unstyled">
                  <li>
                    <p>
                      <i className="bi bi-house me-1"></i> Ort Braude Collage,
                      Karmiel
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="bi bi-envelope me-1"></i>
                      elnn.sh@gmail.com
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="bi bi-envelope me-1"></i>
                      morskurka22@gmail.com
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
