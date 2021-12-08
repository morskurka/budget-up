import BalanceInfoBar from "../components/BalanceInfoBar";
import CategoryGraph from "../components/CategoryGraph";

const CategoryPage = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = [100, 200, 300, 400, 500, 600, 700];

  return (
    <div className="bg-light">
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      <div className="row my-4">
        <div className="col ms-5 ps-5">
          <div className="m-5">
            <CategoryGraph
              icon="shop"
              name="Supermarket"
              graphLabels={labels}
              graphData={data}
            />
          </div>
        </div>
      </div>

      <div className="row my-6"></div>
    </div>
  );
};

export default CategoryPage;
