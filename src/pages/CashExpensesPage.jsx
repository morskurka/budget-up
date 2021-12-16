import { useEffect, useState, useContext } from "react";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CashExpense from "../components/CashExpense";
import { GlobalContext } from "../contexts/GlobalState";

const CashExpensesPage = () => {
  // add / remove CashExpense Components
  const [ExpensesComponents, setExpensesComponents] = useState([
    <CashExpense
      id={0}
      key={0}
      updateExpensesList={addExpenseObject}
      handleDeleteBtnClicked={removeExpenseItem}
    />,
  ]);

  function addExpenseItem() {
    let newId = ExpensesComponents[ExpensesComponents.length - 1].props.id + 1;
    setExpensesComponents([
      ...ExpensesComponents,
      <CashExpense
        id={newId}
        key={newId}
        updateExpensesList={addExpenseObject}
        handleDeleteBtnClicked={removeExpenseItem}
      />,
    ]);
  }

  function removeExpenseItem(id) {
    if (id !== 0) {
      // remove from DOM
      let newExpensesComponents = ExpensesComponents.filter(
        (item) => item.key !== id
      );
      // remove from ExpensesList
      setExpensesComponents(newExpensesComponents);
      let newExpensesList = ExpensesList.filter((item) => item.id !== id);
      setExpensesList(newExpensesList);
    }
  }

  // store expanses details
  const [ExpensesList, setExpensesList] = useState([]);
  function addExpenseObject(id, category, amount) {
    let newExpensesList = [...ExpensesList];
    newExpensesList[id] = { id, category, amount };
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
    if (ExpensesList.length > 0) {
      // TODO: add transactions to database
      ExpensesList.forEach((expense) => addTransaction(expense));
    }
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
                <div>
                  <div>{ExpensesComponents}</div>
                  <div className="ms-5">
                    {/* ADD EXPENSE COMPONENT */}
                    <button
                      className="btn btn-success"
                      onClick={addExpenseItem}
                    >
                      <i className="bi bi-plus-square"></i>
                    </button>
                  </div>
                </div>
                <div className="align-items-center justify-content-center d-flex">
                  <button
                    className="btn btn-success btn-lg rounded-pill"
                    onClick={onSubmit}
                  >
                    Save
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
