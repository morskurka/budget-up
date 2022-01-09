import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalState";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, addUser } = useContext(GlobalContext);
  const [active1, setActive1] = useState("");
  const [active2, setActive2] = useState("");
  const [active3, setActive3] = useState("");
  const navigate = useNavigate();

  function logout() {
    addUser({});
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <div className="navbar-header">
      {user.email && (
        <nav className="navbar navbar-expand-lg">
          <div className="container" id="topOfPage">
            <Link className="navbar-brand fw-bold fs-2 text-dark" to="/">
              <i className="bi bi-coin"></i>
              <i className="bi bi-bar-chart-steps pe-2"></i>
              BudgetUp
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#nav"
              aria-controls="nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon"> </span>
              <span className="toggler-icon"> </span>
              <span className="toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="nav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item d-lg-none mt-3">
                  <p className="fst-italic text-primary">
                    {user.firstName + "-" + user.lastName}
                  </p>
                  <hr />
                </li>
                <li className="nav-item mt-3 mt-lg-0 me-0 me-xl-5">
                  <Link
                    className={"nav-link" + active1}
                    to="/"
                    onClick={() => {
                      setActive1(" active");
                      setActive2("");
                      setActive3("");
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item mt-3 mt-lg-0 me-0 me-xl-5">
                  <Link
                    className={"nav-link" + active2}
                    to="/CashExpensesPage"
                    id="classifyCashExpenses"
                    onClick={() => {
                      setActive2(" active");
                      setActive1("");
                      setActive3("");
                    }}
                  >
                    Classify Cash
                  </Link>
                </li>
                <li className="nav-item mt-3 mt-lg-0">
                  <Link
                    className={"nav-link" + active3}
                    to="/CashIncomesPage"
                    id="addIncome"
                    onClick={() => {
                      setActive3(" active");
                      setActive1("");
                      setActive2("");
                    }}
                  >
                    Add Income
                  </Link>
                </li>
                <li className="nav-item d-lg-none d-sm-inline-block mt-3 mt-lg-0">
                  <button
                    to="/login"
                    className="btn logout-btn"
                    onClick={() => logout()}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="d-none d-lg-inline-block pt-3 pe-3">
              <p className="navbar-user">
                {user.firstName + "-" + user.lastName}
              </p>
            </div>
            <div className="d-none d-lg-inline-block">
              <button
                to="/login"
                className="btn logout-btn"
                onClick={() => logout()}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
