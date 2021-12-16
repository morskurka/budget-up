const CashIncome = (props) => {
  return (
    <>
      <div
        className="row align-items-center m-4 justify-content-center"
        id={"CashIncomeRow" + props.id}
      >
        <div className="col-md-4 col-lg-4 mb-2">
          <div className="form-floating">
            <input
              type="text"
              min="0"
              className="form-control"
              id="cashAmount"
            />
            <label for="cashAmount">Source</label>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 mb-2">
          <div className="form-floating">
            <input type="date" min="0" className="form-control" id="cashDate" />
            <label for="cashDate">Date</label>
          </div>
        </div>
        <div className="col-md-3 col-lg-3 mb-2">
          <div className="form-floating">
            <input
              type="number"
              min="0"
              className="form-control"
              id="cashAmount"
            />
            <label for="cashDate">Amount</label>
          </div>
        </div>
        <div className="col-md-1 col-lg-1 mb-2">
          <button className="btn btn-lg btn-danger">
            <i class="bi bi-eraser"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CashIncome;
