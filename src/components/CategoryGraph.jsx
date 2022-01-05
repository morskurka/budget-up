import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const CategoryGraph = ({
  icon,
  category,
  graphLabels,
  graphData,
  expectedData,
  year,
  previousYear,
  nextYear,
}) => {
  let datasets = [
    {
      data: graphData,
      label: year,
      backgroundColor: "rgba(51, 152, 102, 0.5)",
    },
  ];

  if (year === new Date().getUTCFullYear()) {
    datasets = [
      ...datasets,
      {
        data: expectedData,
        label: "Expected amount",
        backgroundColor: "red",
      },
    ];
  }
  const categoryData = {
    labels: graphLabels,
    datasets: datasets,
  };

  return (
    <div className="single-card">
      <div className="card-head">
        <div className="card-icon">
          <i className={"bi bi-" + icon + " text-white"}></i>
          <span className="ms-4">{category}</span>
        </div>
        <h4 className="card-category">Category Breakdown</h4>
      </div>
      <div className="card-graph">
        <Bar style={{ height: "1000px" }} data={categoryData} />
      </div>
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
  );
};

export default CategoryGraph;
