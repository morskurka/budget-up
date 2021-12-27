import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CashExpense from "../components/CashExpense";
import { GlobalContext } from "../contexts/GlobalState";

const CashExpensesPage = () => {
  const navigate = useNavigate();

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

  const { addTransaction } = useContext(GlobalContext);
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: add transactions to database
    let expenses = JSON.parse(JSON.stringify(ExpensesList));
    expenses.forEach((expense) => {
      delete expense.key;
      expense.amount = -Math.abs(expense.amount);
      addTransaction(expense);
    });
    navigate("/");
  };

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
                  Classify Your Cash Withdrawals
                </h1>
                <div className="row justify-content-center">
                  <div className="">
                    <div className="card m-3 rounded-pill">
                      <div className="card-body text-center">
                        <h3 className="fw-light">
                          Unclassified Cash Withdrawal
                        </h3>
                        {/* TODO: implement logic instead of CONST value */}
                        <h2>{1500 - sum}$</h2>
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
                      disabled={1500 - sum < 0}
                      type="submit"
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

export default CashExpensesPage;
