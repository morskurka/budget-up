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
      backgroundColor: "#04316b7e",
    },
  ];

  if (year === new Date().getUTCFullYear()) {
    datasets = [
      ...datasets,
      {
        data: expectedData,
        label: "Expected amount",
        backgroundColor: "#04316b",
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
        <div className="card-icon d-flex mb-5">
          <i className={"bi bi-" + icon}></i>
          <span className="card-category pt-3 ms-4">{category}</span>
        </div>
      </div>
      <div className="card-graph">
        <Bar data={categoryData} />
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
