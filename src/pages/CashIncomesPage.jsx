import BalanceInfoBar from "../components/BalanceInfoBar";
import CashIncome from "../components/CashIncome";

const CashIncomesPage = () => {
  return (
    <>
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card m-2">
              <div className="card-body p-4 bg-light">
                <h1 className="card-title ms-3 mb-4 display-6 align-items-center">
                  <i className="bi bi-cash-coin me-4"></i>
                  Classify Your Cash Incomes
                </h1>
                <div className="row justify-content-center">
                  <div className="">
                    <div className="card m-3 rounded-pill">
                      <div className="card-body text-center">
                        <h3 className="fw-light">Unclassified Cash Income</h3>
                        <h2>1500$</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <CashIncome id="1" />
                </div>
                <div className="ms-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashIncomesPage;
