import { useRef, useState } from "react";

const CashExpense = ({ id, updateExpenseItem, handleDeleteBtnClicked }) => {
  const [category, setCategory] = useState("");
  const amount = useRef();
  const date = useRef();

  function handleCategoryChange(e) {
    setCategory(e.target.value);
    updateExpenseItem(
      parseInt(id),
      e.target.value,
      date.current.value,
      parseInt(amount.current.value)
    );
  }

  return (
    <>
      <div className="row align-items-center m-4 justify-content-center">
        <div className="col-md-4 mb-2">
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

        <div className="col-md-4 mb-2">
          <input
            type="date"
            min="0"
            className="form-control"
            ref={date}
            onChange={() =>
              updateExpenseItem(
                parseInt(id),
                category,
                date.current.value,
                parseInt(amount.current.value)
              )
            }
          />
        </div>
        <div className="col-md-3 col-lg-2 mb-2">
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              min="0"
              className="form-control"
              ref={amount}
              onChange={() =>
                updateExpenseItem(
                  parseInt(id),
                  category,
                  date.current.value,
                  parseInt(amount.current.value)
                )
              }
            />
          </div>
        </div>
        <div className="col-md-1 mb-2">
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
