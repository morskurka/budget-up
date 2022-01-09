import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import CategoryGraph from "../components/CategoryGraph";
import CategoryTable from "../components/CategoryTable";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const {
    transactions,
    categoriesIcons,
    categoriesInfo,
    currCategory,
    setCurrCategory,
    user,
    addUser,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    // make sure user is logged in
    if (sessionStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
      // if not - navigate to login page
    } else if (!user.email) {
      navigate("/login");
    }
    // handle case of refresh
    if (sessionStorage.getItem("currCategory") && !currCategory) {
      console.log(sessionStorage.getItem("currCategory"));
      setCurrCategory(sessionStorage.getItem("currCategory"));
    } else if (!currCategory) {
      navigate("/");
    }
  }, []);

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
      item.category === currCategory &&
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
    (item) => item.category === currCategory
  );

  let expectedData = [];
  if (currCategoryInfo[0]) {
    let len = currCategoryInfo[0].expectedData.length;
    expectedData = currCategoryInfo[0].expectedData.slice(
      len - (new Date().getUTCFullYear() - year + 1) * 12,
      len - (new Date().getUTCFullYear() - year) * 12
    );
  }

  //display previous year
  function previousYear() {
    setYear(year - 1);
  }

  //display next year
  function nextYear() {
    setYear(year + 1);
  }

  return (
    <div>
      <BalanceInfoBar />
      <div className="categoryGraph-card">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <CategoryGraph
                icon={categoriesIcons[currCategory]}
                category={currCategory}
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
