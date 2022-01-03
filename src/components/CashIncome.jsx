const CashIncome = ({ setSource, setDate, setAmount }) => {
  return (
    <>
      <div className="row align-items-center m-4 justify-content-center">
        <div className="col-md-4 col-lg-4 mb-2">
          <div className="form-floating">
            <input
              onChange={(e) => setSource(e.target.value)}
              type="text"
              className="form-control"
              id="cashSource"
              required
            />
            <label htmlFor="cashSource">Source</label>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 mb-2">
          <div className="form-floating">
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="form-control"
              max={new Date().toISOString().split("T")[0]}
              required
              id="cashDate"
            />
            <label htmlFor="cashDate">Date</label>
          </div>
        </div>
        <div className="col-md-3 col-lg-3 mb-2">
          <div className="form-floating">
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              min="0"
              className="form-control"
              id="cashAmount"
              required
            />
            <label htmlFor="cashAmount">Amount</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashIncome;
