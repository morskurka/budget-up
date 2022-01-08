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

  let currCategoryInfo = categoriesInfo.filter(
    (item) => item.category === category
  );

  let len = currCategoryInfo[0].expectedData.length;
  let expectedData = currCategoryInfo[0].expectedData.slice(
    len - (new Date().getUTCFullYear() - year + 1) * 12,
    len - (new Date().getUTCFullYear() - year) * 12
  );

  console.log("full array");
  console.log(currCategoryInfo[0].expectedData);
  console.log(year);
  console.log(expectedData);
  console.log("method");
  console.log(currCategoryInfo[0].method);
  console.log("MSE");
  console.log(currCategoryInfo[0].mse);

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
    <div>
      <BalanceInfoBar />
      <div className="categoryGraph-card">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
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
            </div>
          </div>
          <div className="row">
            <div className="col">
              <CategoryTable data={categoryData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
