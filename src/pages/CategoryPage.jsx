import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CategoryGraph from "../components/CategoryGraph";
import CategoryTable from "../components/CategoryTable";
import { useNavigate } from "react-router-dom";

const CategoryPage = ({ category }) => {
  const { transactions, categoriesIcons, categoriesInfo } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getUTCFullYear());
  let expectedData = new Array(12).fill(0);
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

  let monthlySum = categoryData.reduce(function (acc, item) {
    let month = new Date(item.tDate).getMonth();
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += Math.abs(item.amount);
    return acc;
  }, []);

  if (year === new Date().getUTCFullYear()) {
    let currCategoryInfo = categoriesInfo.filter(
      (item) => item.category === category
    );
    expectedData[new Date().getMonth()] = currCategoryInfo[0].expected;
  }

  //display previous year
  function previousYear() {
    setYear(year - 1);
  }

  //display next year
  function nextYear() {
    setYear(year + 1);
  }

  useEffect(() => {
    if (!category) navigate("/");
  }, [category]);

  return (
    <div className="bg-light">
      <BalanceInfoBar />
      <div className="row my-4">
        <div className="col ms-5 ps-5">
          <div className="m-5">
            <CategoryGraph
              icon={categoriesIcons[category]}
              category={category}
              year={year}
              graphLabels={labels}
              graphData={monthlySum}
              expectedData={expectedData}
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
