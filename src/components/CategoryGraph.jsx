import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const CategoryGraph = ({
  icon,
  category,
  graphLabels,
  graphData,
  year,
  previousYear,
  nextYear,
}) => {
  const categoryData = {
    labels: graphLabels,
    datasets: [
      {
        data: graphData,
        label: year,
        backgroundColor: "rgba(51, 152, 102, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div
        className="card shadow-lg bg-body rounded my-5 me-4 position-relative"
        style={{ maxWidth: "55rem" }}
      >
        <span className="position-absolute top-0 start-0 translate-middle badge bg-success text-white bg-opacity-75 p-3 text-center">
          <i className={"bi bi-" + icon} style={{ fontSize: "50px" }}></i>
        </span>
        <div className="card-body text-dark ps-5 ms-2 font mt-2">
          <h3 className="card-title text-decoration-underline mt-2">
            {category}
          </h3>
          <p className="card-text">
            <Bar data={categoryData} />
          </p>
          <div className="card-footer bg-white">
            <button
              className="btn me-4"
              style={{ fontSize: "45px" }}
              onClick={() => previousYear()}
              disabled={year === new Date().getUTCFullYear() - 3 ? true : false}
            >
              <i className="bi bi-arrow-left-circle"></i>
            </button>
            <button
              className="btn"
              style={{ fontSize: "45px" }}
              onClick={() => nextYear()}
              disabled={year === new Date().getUTCFullYear() ? true : false}
            >
              <i className="bi bi-arrow-right-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGraph;
