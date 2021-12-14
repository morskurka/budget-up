const BalanceInfoCard = ({ title, icon, amount }) => {
  return (
    <div
      className="card"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.125)",
        borderRadius: "0.375rem",
      }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4>{title}</h4>
          </div>
          <div className="text-primary">
            <i className={"bi bi-" + icon + " fs-4"}></i>
          </div>
        </div>
        <div
          className={
            (amount > 0 ? "text-success" : "text-danger") + " fw-bold pt-4"
          }
        >
          <h1>{amount && amount + "$"}</h1>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfoCard;
