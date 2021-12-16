const Navbar = () => {
  const image = true;

  return (
    <nav
      className="navbar navbar-expand-md navbar-light bg-light shadow-sm py-0"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <a className="navbar-brand fw-bold fs-2" href="#">
          <img
            className="mx-2"
            src="logo192.png"
            alt=""
            width="30"
            height="24"
          />
          BudgetUP
        </a>
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
              <a className="nav-link active my-3" aria-current="page" href="/">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link my-3" href="/CategoryRow">
                CategoryRow
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link my-3" href="/CategoryPage">
                CategoryPage
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link my-3" href="/CashExpensesPage">
                CashExpensesPage
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link my-3" href="/CashIncomesPage">
                CashIncomesPage
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
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
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdown04">
                <li>
                  <p className="fs-6  fst-italic text-center text-secondary">
                    Mor-Skurka
                  </p>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-person mx-2 "></i>
                    MY PROFILE
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-gear mx-2"></i>
                    SETTINGS
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                  <a className="dropdown-item-dark" href="#">
                    <i className="bi bi-box-arrow-right mx-2"></i>
                    LOG OUT
                  </a>
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
