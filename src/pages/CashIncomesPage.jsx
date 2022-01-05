import BalanceInfoBar from "../components/BalanceInfoBar";
import CashIncome from "../components/CashIncome";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalState";

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

  return (
    <>
      <BalanceInfoBar />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card m-2">
              <div className="card-body p-4 bg-light">
                <h1 className="card-title ms-3 mb-4 display-6 align-items-center">
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
                      className="btn btn-success btn-lg rounded-pill"
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
    </>
  );
};

export default CashIncomesPage;
