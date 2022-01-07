import BalanceInfoBar from "../components/BalanceInfoBar";
import CashIncome from "../components/CashIncome";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import Header from "../components/Header";
import UploadTransactions from "../components/UploadTransactions";

const CashIncomesPage = () => {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const { addIncomeTransaction, transactions, addUser, user } =
    useContext(GlobalContext);

  useEffect(() => {
    if (sessionStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
    } else if (!user.email) {
      navigate("/login");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: add transactions to database
    if (amount <= 0 || date.trim() === "" || source.trim() === "") return;
    await addIncomeTransaction({
      id: transactions[transactions.length - 1].id + 1,
      category: "Income",
      subCategory: source,
      tDate: date,
      amount: parseFloat(amount),
    });
    navigate("/");
  };

  if (transactions.length === 0) {
    return <UploadTransactions />;
  }

  return (
    <>
      <BalanceInfoBar />
      <div className="cash-expenses">
        <div className="py-5">
          <Header
            title="Add Cash Incomes" //**********
            body="Follow your real financial status by adding your cash incomes and keep tracing them easily"
          />
        </div>
        <div className="container">
          <section className="cash-expense-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="single-cash-expense">
                    <div className="info">
                      <h5>
                        <i className="bi bi-cash-coin pe-2"></i>Cash Incomes
                      </h5>
                      <p>Add Your Cash Incomes</p>
                    </div>
                    <div className="card m-2">
                      <div className="p-4">
                        <h1 className="ms-3 mb-4 display-6 align-items-center">
                          <i className="bi bi-cash-coin me-4"></i>
                          Add Your Cash Incomes
                        </h1>
                        <form onSubmit={onSubmit}>
                          <CashIncome
                            setSource={setSource}
                            setDate={setDate}
                            setAmount={setAmount}
                          />
                          <div className="align-items-center justify-content-center d-flex">
                            <button
                              className="btn save-btn"
                              /* TODO: implement logic instead of CONST value */
                              type="submit"
                              disabled={
                                amount <= 0 ||
                                date.trim() === "" ||
                                source.trim() === ""
                              }
                              id="saveBtn"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CashIncomesPage;
