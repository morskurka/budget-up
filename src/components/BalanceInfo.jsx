const BalanceInfo = (props) => {
  const { title, amount } = props;

  return (
    <div className="row justify-content-center align-items-center">
      <div className="card rounded-pill bg-light  col-auto m-2">
        <div className="fw-light text-center">{title}</div>
        <div
          className={
            (amount > 0 ? "text-success" : "text-danger") +
            " fw-bold lead text-center"
          }
        >
          {amount && amount + "$"}
        </div>
      </div>
    </div>
  );
};

export default BalanceInfo;
