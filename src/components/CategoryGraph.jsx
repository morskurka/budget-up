import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Header from "./Header";

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
  const navigate = useNavigate();
  const categoryData = {
    labels: graphLabels,
    datasets: datasets,
  };

  return (
    <section>
      <div className="pt-5 pb-3">
        <Header
          title="Category Breakdown"
          body="view your every month expenses in a specific category"
        />
      </div>
      <div className="single-card">
        <button
          className="btn card-back-btn pe-lg-5 pt-lg-3 pe-3 pt-1"
          onClick={() => navigate("/")}
        >
          Back<i className="bi bi-arrow-bar-right"></i>
        </button>
        <div className="card-head">
          <div className="card-icon d-flex">
            <i className={"me-4 bi bi-" + icon}></i>
            <span className="card-category pt-3">{category}</span>
          </div>
        </div>
        <div className="card-graph">
          <Bar data={categoryData} />
        </div>
        <div className="card-footer bg-white">
          <button
            className="btn card-slide-btn me-4"
            onClick={() => previousYear()}
            disabled={year === new Date().getUTCFullYear() - 3 ? true : false}
          >
            <i className="bi bi-arrow-left-circle"></i>
          </button>
          <button
            className="btn card-slide-btn"
            onClick={() => nextYear()}
            disabled={year === new Date().getUTCFullYear() ? true : false}
          >
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGraph;
