import ProgressBarBU from "./ProgressBarBU";

const Category = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row justify-content-around align-items-center">
          <div className="col-4">
            <i class={"bi fs-4 bi-" + props.icon}></i>
            <div className="card-title fs-4">{props.name}</div>
          </div>
          <div className="col-6">
            <div className="row justify-content-between">
              <div className="col">
                <div className="lead">Current</div>
                <div className="fw-bold">{props.currBalance + "$"}</div>
              </div>
              <div className="col text-end">
                <div className="lead">Expected</div>
                <div className="fw-bold">{props.totalExpected + "$"}</div>
              </div>
            </div>

            <ProgressBarBU
              currBalance={props.currBalance}
              totalExpected={props.totalExpected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
