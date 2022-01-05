import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalState";

const Test2 = () => {
  const { user } = useContext(GlobalContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-2" to="/">
          BudgetUP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul id="nav" className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="page-scroll active" href="/">
                Home
              </a>
            </li>
            {user.email && (
              <li className="nav-item">
                <Link
                  className=""
                  to="/CashExpensesPage"
                  id="classifyCashExpenses"
                >
                  Classify Cash Expenses
                </Link>
              </li>
            )}
            {user.email && (
              <li className="nav-item">
                <Link className="" to="/CashIncomesPage" id="addIncome">
                  Add Income Transaction
                </Link>
              </li>
            )}
            <li className="nav-item">
              <a className="page-scroll" href="#about">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Test2;
