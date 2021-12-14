import BalanceInfoBar from "../components/BalanceInfoBar";
import CashExpense from "../components/CashExpense";

const CashExpensesPage = () => {
  return (
    <>
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card m-2">
              <div className="card-body p-4 bg-light">
                <h1 className="card-title ms-3 mb-4 display-6 align-items-center">
                  <i class="bi bi-cash-coin me-4"></i>
                  Classify Your Cash Withdrawals
                </h1>
                <div className="row justify-content-center">
                  <div className="">
                    <div className="card m-3 rounded-pill">
                      <div className="card-body text-center">
                        <h3 className="fw-light">
                          Unclassified Cash Withdrawal
                        </h3>
                        <h2>1500$</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <CashExpense />
                  <CashExpense />
                  <CashExpense />
                  <CashExpense />
                </div>
                <div className="ms-5">
                  <button className="btn btn-success">
                    <i class="bi bi-plus-square"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashExpensesPage;
