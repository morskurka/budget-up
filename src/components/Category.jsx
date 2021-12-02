import ProgressBarBU from "./ProgressBarBU";

const Category = (props) => {
  const percentages = (props.currBalance / props.totalExpected) * 100;

  return (
    <div className="card rounded-pill bg-light">
      <div className="card-body">
        <div className="row justify-content-around align-items-center">
          <div className="col-4">
            <div className="card-title fs-5">
              <i class={"bi bi-" + props.icon}></i>
              {" " + props.name}
            </div>
          </div>
          <div className="col-6">
            <div className="row justify-content-between">
              <div className="col">
                <div className="fw-light">Current</div>
                <div
                  className={
                    (percentages > 100 ? "text-danger " : "text-success ") +
                    "fw-bold lead"
                  }
                >
                  {props.currBalance + "$"}
                </div>
              </div>
              <div className="col text-end">
                <div className="fw-light">Expected</div>
                <div className="fw-bold lead">{props.totalExpected + "$"}</div>
              </div>
            </div>

            <ProgressBarBU percentages={percentages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
