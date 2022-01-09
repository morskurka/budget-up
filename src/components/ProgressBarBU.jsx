const ProgressBarBU = (props) => {
  const { percentages, title } = props;

  const getBgColor = (title) => {
    let textColor = "";
    if (title.toLowerCase() !== "income" && title.toLowerCase() !== "saving") {
      percentages > 100
        ? (textColor = "bg-danger ")
        : (textColor = "bg-success ");
    } else {
      percentages > 100
        ? (textColor = "bg-success ")
        : (textColor = "bg-danger ");
    }
    return textColor;
  };

  return (
    <div className="progress rounded-pill" style={{ height: 25 + "px" }}>
      <div
        className={"progress-bar rounded-pill " + getBgColor(title)}
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
