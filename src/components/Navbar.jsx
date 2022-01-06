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
    navigate("/login");
  }

  return (
    <div className="navbar-header">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand fw-bold fs-2" to="/">
            <img src="/logo192.png" alt="" />
            BudgetUP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent2"
            aria-controls="navbarSupportedContent2"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
          </button>
          {user.email && (
            <div
              className="collapse navbar-collapse sub-menu-bar"
              id="navbarSupportedContent2"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item d-lg-none">
                  <p className="fst-italic text-secondary pt-3">
                    {user.firstName + "-" + user.lastName}
                  </p>
                  <hr />
                </li>
                <li className="nav-item mt-4">
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
                <li className="nav-item mt-4">
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
                <li className="nav-item mt-4">
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
                <li className="nav-link mt-4">
                  <Link
                    to="/login"
                    className="logout-btn"
                    onClick={() => logout()}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </Link>
                </li>
                <li className="nav-link d-lg-flex d-none mt-1">
                  <div className="navbar-user d-lg-flex justify-content-center align-items-center ms-2 d-none">
                    <i className="bi bi-person-check text-white"></i>
                  </div>
                </li>
                <li className="nav-item mt-5 d-lg-flex d-none">
                  <p className="text-primary">
                    {user.firstName + "-" + user.lastName}
                  </p>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
