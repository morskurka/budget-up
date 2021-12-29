import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CategoryGraph from "../components/CategoryGraph";
import CategoryTable from "../components/CategoryTable";

const CategoryPage = ({ category }) => {
  const { transactions, categoriesIcons } = useContext(GlobalContext);
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // calculate the sum for each month for specific category
  const categoryData = transactions.filter(
    (item) =>
      item.category === category &&
      new Date(item.tDate).getUTCFullYear() === year
  );

  const monthlySum = categoryData.reduce(function (acc, item) {
    let month = new Date(item.tDate).getMonth();
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += Math.abs(item.amount);
    return acc;
  }, []);

  //display previous year
  function previousYear() {
    setYear(year - 1);
  }

  //display next year
  function nextYear() {
    setYear(year + 1);
  }

  return (
    <div className="bg-light">
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      <div className="row my-4">
        <div className="col ms-5 ps-5">
          <div className="m-5">
            <CategoryGraph
              icon={categoriesIcons[category]}
              category={category}
              year={year}
              graphLabels={labels}
              graphData={monthlySum}
              previousYear={previousYear}
              nextYear={nextYear}
            />
            <CategoryTable data={categoryData} />
          </div>
        </div>
      </div>
      <div className="row my-6"></div>
    </div>
  );
};

export default CategoryPage;
