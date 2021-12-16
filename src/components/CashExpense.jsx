const CashExpense = (props) => {
  return (
    <>
      <div
        className="row align-items-center m-4 justify-content-center"
        id={"cashExpenseRow" + props.id}
      >
        <div className="col-sm-6 col-md-4 mb-2">
          <select className="form-select form-select-md">
            <option value="">Select Category</option>
            <option value="Supermarket">Supermarket</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-2 mb-2">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">
              $
            </span>
            <input
              type="number"
              min="0"
              className="form-control"
              id="cashAmount"
            />
          </div>
        </div>
        <div className="col-sm-2 mb-2">
          <button className="btn btn-danger">
            <i class="bi bi-eraser"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CashExpense;
