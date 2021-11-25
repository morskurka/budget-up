const ProgressBarBU = () => {
  return (
    <div class="progress" style={{ height: 20 + "px" }}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: 25 + "%" }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBarBU;
