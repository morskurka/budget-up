import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";

const CashExpense = ({ id, updateExpensesList, handleDeleteBtnClicked }) => {
  const [category, setCategory] = useState("");
  const amount = useRef();
  const { addTransaction } = useContext(GlobalContext);

  function handleCategoryChange(e) {
    setCategory(e.target.value);
    updateExpensesList(
      parseInt(id),
      e.target.value,
      parseInt(amount.current.value)
    );
  }

  return (
    <>
      <div
        className="row align-items-center m-4 justify-content-center"
        id={"cashExpenseRow" + id}
      >
        <div className="col-sm-6 col-md-4 mb-2">
          <select
            className="form-select form-select-md"
            name="category"
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="Supermarket">Supermarket</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-2 mb-2">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              $
            </span>
            <input
              type="number"
              min="0"
              className="form-control"
              id="cashAmount"
              ref={amount}
              onChange={() =>
                updateExpensesList(
                  parseInt(id),
                  category,
                  parseInt(amount.current.value)
                )
              }
            />
          </div>
        </div>
        <div className="col-sm-2 mb-2">
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteBtnClicked(id)}
          >
            <i className="bi bi-eraser"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CashExpense;
