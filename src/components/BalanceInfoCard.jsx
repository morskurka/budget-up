const BalanceInfoCard = ({ text, icon, amount }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0">{text}</h4>
          </div>
          <div className="text-primary">
            <i className={"bi bi-" + icon + " fs-4"}></i>
          </div>
        </div>
        <div
          className={(amount > 0 ? "text-success" : "text-danger") + " fw-bold"}
        >
          <h1>{amount && amount + "$"}</h1>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfoCard;
