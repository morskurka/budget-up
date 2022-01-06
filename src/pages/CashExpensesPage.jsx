import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CashExpense from "../components/CashExpense";
import Header from "../components/Header";
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
      <div className="cash-expenses">
        <div className="py-5">
          <Header
            title="Classify Your Cash Withdrawals"
            body="Select a cash withdrawal and classify it into one category or more in order to follow your cash expenses better"
          />
        </div>
        <div className="container">
          <section className="cash-expense-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="single-cash-expense">
                    <div className="info">
                      <h5>Cash Withdrawal</h5>
                      <p>Classify your cash withdrawals into categories</p>
                    </div>
                    <div className="card">
                      <div className="row justify-content-center">
                        <div className="col-xl-10">
                          <div className="m-2">
                            <div className="cash-expenses-content">
                              <div className="row justify-content-center">
                                <div className="">
                                  <div className="m-3 rounded-pill">
                                    <div className="text-center">
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
                                          Math.abs(cashWithdrawalItem.amount) -
                                            sum}
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
                                <div className="me-5 d-flex justify-content-end cash-expense-btn">
                                  {/* ADD EXPENSE COMPONENT */}
                                  <button
                                    className="add-btn"
                                    onClick={addExpenseItem}
                                    type="button"
                                  >
                                    <i className="bi bi-plus-lg"></i>
                                  </button>
                                </div>
                                <div className="align-items-center justify-content-center d-flex">
                                  <button
                                    className="btn save-btn mb-3"
                                    /* TODO: implement logic instead of CONST value */
                                    disabled={
                                      cashWithdrawalItem &&
                                      Math.abs(cashWithdrawalItem.amount) -
                                        sum <
                                        0
                                    }
                                    type="submit"
                                    id="saveBtn"
                                  >
                                    Save
                                  </button>
                                </div>
                              </form>
                              <div className="row cash-expense-btn mb-4">
                                <button
                                  className="arrow-btn"
                                  style={{ fontSize: "45px" }}
                                  onClick={() => previousCashWithdrawal()}
                                >
                                  <i className="bi bi-arrow-left-short"></i>
                                </button>
                                <button
                                  className="arrow-btn"
                                  style={{ fontSize: "45px" }}
                                  onClick={() => nextCashWithdrawal()}
                                >
                                  <i className="bi bi-arrow-right-short"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default CashExpensesPage;
