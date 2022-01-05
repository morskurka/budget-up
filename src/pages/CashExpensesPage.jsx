import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CashExpense from "../components/CashExpense";
import { GlobalContext } from "../contexts/GlobalState";

const CashExpensesPage = () => {
  const navigate = useNavigate();
  const { addTransaction, transactions, user, addUser } =
    useContext(GlobalContext);
  const [cashWithdrawalItem, setCashWithdrawalItem] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
    } else if (!user.email) {
      navigate("/login");
    }
  }, []);

  // get all Cash withdrawals transactions
  const cashWithdrawals = transactions
    .filter((transaction) => transaction.category === "Cash withdrawals")
    .sort((a, b) => (a.tDate < b.tDate ? 1 : a.tDate > b.tDate ? -1 : 0));

  // update cashWithdrawals
  useEffect(() => {
    setCashWithdrawalItem(cashWithdrawals[index]);
  }, [transactions, index]);

  //display previous withdrawal
  function previousCashWithdrawal() {
    if (index < cashWithdrawals.length + 1) {
      setIndex(index + 1);
    }
  }

  //display next withdrawal
  function nextCashWithdrawal() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  // store expanses details
  const [idCounter, setIdCounter] = useState(0);
  const [ExpensesList, setExpensesList] = useState([
    { id: idCounter, key: idCounter },
  ]);

  const addExpenseItem = () => {
    setExpensesList([
      ...ExpensesList,
      { id: idCounter + 1, key: idCounter + 1 },
    ]);
    setIdCounter(idCounter + 1);
  };

  function removeExpenseItem(id) {
    if (ExpensesList.length > 1) {
      let newExpensesList = ExpensesList.filter((item) => item.id !== id);
      setExpensesList(newExpensesList);
    }
  }

  function updateExpenseItem(id, category, tDate, amount) {
    let newExpensesList = [...ExpensesList];
    let index = newExpensesList.findIndex((item) => item.id === id);
    newExpensesList[index] = { id, key: id, category, tDate, amount };
    setExpensesList(newExpensesList);
  }

  // handle unclassified sum
  const [sum, setSum] = useState(0);

  function updateSum() {
    let newSum = ExpensesList.reduce((prevVal, nextVal) => {
      prevVal = isNaN(prevVal) ? 0 : prevVal;
      nextVal.amount = isNaN(nextVal.amount) ? 0 : nextVal.amount;
      return prevVal + nextVal.amount;
    }, 0);
    setSum(newSum);
  }

  // update the sum each time the list is changed
  useEffect(() => {
    updateSum();
  }, [ExpensesList]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (cashWithdrawalItem && Math.abs(cashWithdrawalItem.amount) - sum < 0)
      return;
    let expenses = JSON.parse(JSON.stringify(ExpensesList));
    expenses.forEach(async (expense) => {
      delete expense.key;
      expense.amount = -Math.abs(expense.amount);
      expense.withdrawTransaction = cashWithdrawals[index];
      expense.withdrawTransaction.amount -= expense.amount;
      await addTransaction(expense);
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
                  Classify Your Cash Withdrawals
                </h1>
                <div className="row justify-content-center">
                  <div className="">
                    <div className="card m-3 rounded-pill">
                      <div className="card-body text-center">
                        <h3 className="fw-light">
                          Unclassified Cash Withdrawal
                        </h3>
                        <h2>
                          <div className="lead">
                            {cashWithdrawalItem &&
                              `Transaction ${
                                cashWithdrawalItem.id
                              } from ${new Date(
                                cashWithdrawalItem.tDate
                              ).toLocaleDateString()}: `}
                          </div>
                          {cashWithdrawalItem &&
                            Math.abs(cashWithdrawalItem.amount) - sum}
                          $
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={onSubmit}>
                  <div>
                    {ExpensesList.map((expense) => (
                      <CashExpense
                        id={expense.key}
                        key={expense.key}
                        minDate={
                          cashWithdrawalItem
                            ? cashWithdrawalItem.tDate
                            : new Date().toDateString()
                        }
                        updateExpenseItem={updateExpenseItem}
                        handleDeleteBtnClicked={removeExpenseItem}
                      />
                    ))}
                  </div>
                  <div className="me-5 d-flex justify-content-end">
                    {/* ADD EXPENSE COMPONENT */}
                    <button
                      className="btn btn-success"
                      onClick={addExpenseItem}
                      type="button"
                    >
                      <i className="bi bi-plus-square"></i>
                    </button>
                  </div>
                  <div className="align-items-center justify-content-center d-flex">
                    <button
                      className="btn btn-success btn-lg rounded-pill"
                      /* TODO: implement logic instead of CONST value */
                      disabled={
                        cashWithdrawalItem &&
                        Math.abs(cashWithdrawalItem.amount) - sum < 0
                      }
                      type="submit"
                      id="saveBtn"
                    >
                      Save
                    </button>
                  </div>
                </form>
                <div>
                  <button
                    className="btn me-4"
                    style={{ fontSize: "45px" }}
                    onClick={() => previousCashWithdrawal()}
                  >
                    <i className="bi bi-arrow-left-circle"></i>
                  </button>
                  <button
                    className="btn"
                    style={{ fontSize: "45px" }}
                    onClick={() => nextCashWithdrawal()}
                  >
                    <i className="bi bi-arrow-right-circle"></i>
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
