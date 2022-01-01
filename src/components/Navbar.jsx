import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalState";

const Navbar = () => {
  const image = true;
  const { user } = useContext(GlobalContext);
  return (
    <nav
      className="navbar navbar-expand-md navbar-light bg-light shadow-sm py-0"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-2" to="/">
          <img
            className="mx-2"
            src="logo192.png"
            alt=""
            width="30"
            height="24"
          />
          BudgetUP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link active my-3" aria-current="page" to="/">
                HOME
              </Link>
            </li>
            {user.email && (
              <li className="nav-item">
                <Link className="nav-link my-3" to="/CashExpensesPage">
                  Classify Cash Expenses
                </Link>
              </li>
            )}
            {user.email && (
              <li className="nav-item">
                <Link className="nav-link my-3" to="/CashIncomesPage">
                  Add Income Transaction
                </Link>
              </li>
            )}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="dropdown04"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="ms-4 me-1 d-inline-block rounded-circle border border-dark border-1"
                  src={image ? "mor.png" : "user.png"}
                  alt=""
                  width="55"
                  height="55"
                />
              </Link>
              <ul className="dropdown-menu" aria-labelledby="dropdown04">
                <li>
                  <p className="fs-6  fst-italic text-center text-secondary">
                    Mor-Skurka
                  </p>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/ProfileSettingsPage">
                    <i className="bi bi-person mx-2 "></i>
                    MY PROFILE
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bi bi-gear mx-2"></i>
                    SETTINGS
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                  <Link className="dropdown-item-dark" to="/">
                    <i className="bi bi-box-arrow-right mx-2"></i>
                    LOG OUT
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
