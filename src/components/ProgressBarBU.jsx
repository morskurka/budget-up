const ProgressBarBU = (props) => {
  const { percentages } = props;
  return (
    <div className="progress rounded-pill" style={{ height: 25 + "px" }}>
      <div
        className={
          "progress-bar rounded-pill " +
          (percentages > 100 ? "bg-danger" : "bg-success")
        }
        role="progressbar"
        style={{ width: percentages + "%" }}
        aria-valuenow={percentages}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBarBU;
