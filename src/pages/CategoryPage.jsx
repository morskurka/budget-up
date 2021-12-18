import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CategoryGraph from "../components/CategoryGraph";
import CategoryTable from "../components/CategoryTable";

const CategoryPage = ({ category }) => {
  const { transactions } = useContext(GlobalContext);
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
  const monthlySum = transactions
    .filter(
      (item) =>
        item.category === category &&
        new Date(item.date).getUTCFullYear() === year
    )
    .reduce(function (acc, item) {
      let month = new Date(item.date).getMonth();
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += Math.abs(item.amount);
      return acc;
    }, []);

  //display previous year
  function previousYear() {
    setYear(year - 1);
    console.log(year);
  }

  //display next year
  function nextYear() {
    setYear(year + 1);
    console.log(year);
  }

  return (
    <div className="bg-light">
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      <div className="row my-4">
        <div className="col ms-5 ps-5">
          <div className="m-5">
            <CategoryGraph
              icon="shop"
              category="Supermarket"
              year={year}
              graphLabels={labels}
              graphData={monthlySum}
              previousYear={previousYear}
              nextYear={nextYear}
            />
            <CategoryTable />
          </div>
        </div>
      </div>
      <div className="row my-6"></div>
    </div>
  );
};

export default CategoryPage;
