import ProgressBarBU from "./ProgressBarBU";

const CategoryCard = ({ icon, title, currBalance, totalExpected }) => {
  const percentages = (currBalance / totalExpected) * 100;

  return (
    <div
      style={{
        padding: "30px 35px",
        borderRadius: "10px",
        marginBottom: "40px",
        marginTop: "30px",
        boxShadow: "0px 5px 25px rgba(218, 211, 211, 0.3)",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "#2F80ED",
          color: "#ffffff",
          fontSize: "35px",
          marginBottom: "20px",
          marginTop: "-60px",
        }}
      >
        <i className={"bi bi-" + icon}></i>
      </div>
      <div>
        <h4 className="fw-bold">{title}</h4>
        <div className="pt-3">
          <div className="row justify-content-between">
            <div className="col">
              <div className="fw-light">Current</div>
              <div
                className={
                  (percentages > 100 ? "text-danger " : "text-success ") +
                  "fw-bold lead"
                }
              >
                {currBalance + "$"}
              </div>
            </div>
            <div className="col text-end">
              <div className="fw-light">Expected</div>
              <div className="fw-bold lead">{totalExpected + "$"}</div>
            </div>
          </div>
          <ProgressBarBU percentages={percentages} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
