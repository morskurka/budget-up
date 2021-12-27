import CategoryCard from "../components/CategoryCard";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
//import Prediction from "../components/Prediction";
import {
  SimpleExponentialSmoothing,
  HoltSmoothing,
  HoltWintersSmoothing,
} from "../contexts/exponential-smoothing";

const HomePage = () => {
  const {
    transactions,
    getCategoriesNames,
    categoriesInfo,
    addCategoryInfo,
    categoriesIcons,
  } = useContext(GlobalContext);

  // initialize the categoryInfo array when the user first signed up
  function initCategoryInfo() {
    const categoriesName = getCategoriesNames();

    const year = new Date().getUTCFullYear();

    categoriesName.forEach((cat) => {
      const currYear = getMonthlySums(cat, year);
      const secondYear = getMonthlySums(cat, year - 1);
      const thirdYear = getMonthlySums(cat, year - 2);

      let categoryInfo = {
        category: cat,
        monthlySums: {
          currYear: currYear,
          secondYear: secondYear,
          thirdYear: thirdYear,
        },
        expected: null,
      };
      categoryInfo = chooseExMethod(categoryInfo);
      //console.log("init");
      //console.log(categoryInfo);
      addCategoryInfo(categoryInfo);
      //console.log("after");
      //console.log(categoriesInfo);
    });
  }

  // get monthly sums for single year in specific category
  function getMonthlySums(category, year) {
    let res = new Array(12).fill(0);
    const MonthlySums = transactions
      .filter(
        (item) =>
          item.category === category &&
          new Date(item.tDate).getUTCFullYear() === year
      )
      .reduce(function (acc, item) {
        let month = new Date(item.tDate).getMonth();
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += Math.abs(item.amount);
        return acc;
      }, res);
    return MonthlySums;
  }

  // find the most suitable EX method for each category
  function chooseExMethod(categoryInfo) {
    let simpleMSE = 0;
    let doubleMSE = 0;
    let tripleMSE = 0;
    let index = 0;

    const data = [
      ...categoryInfo.monthlySums.thirdYear,
      ...categoryInfo.monthlySums.secondYear,
      ...categoryInfo.monthlySums.currYear.slice(0, new Date().getMonth() + 1),
    ];
    index = data.length;

    let simpleExp = new SimpleExponentialSmoothing(data, 0.5);
    let doubleExp = new HoltSmoothing(data, 0.5, 0.5);
    let tripleExp = new HoltWintersSmoothing(data, 0.5, 0.5, 0.5, 12, true);
    simpleExp.optimizeParameter(10);
    doubleExp.optimizeParameters(10);
    tripleExp.optimizeParameters(10);
    simpleExp.predict();
    doubleExp.predict();
    tripleExp.predict();
    // if (categoryInfo.category === "Supermarket") {
    //   console.log(simpleExp);
    //   console.log(doubleExp);
    //   console.log(tripleExp);
    // }
    simpleMSE = simpleExp.computeMeanSquaredError();
    doubleMSE = doubleExp.computeMeanSquaredError();
    tripleMSE = tripleExp.computeMeanSquaredError();
    // if (categoryInfo.category === "Supermarket") {
    //   console.log(simpleMSE);
    //   console.log(doubleMSE);
    //   console.log(tripleMSE);
    // }
    categoryInfo = findMinMSE(
      simpleMSE,
      doubleMSE,
      tripleMSE,
      simpleExp,
      doubleExp,
      tripleExp,
      categoryInfo,
      index
    );
    //console.log("choose");
    //console.log(categoryInfo);
    return categoryInfo;
  }

  /* find the EX method with the minimum MSE for specific category
and update the expected amount for this category*/
  function findMinMSE(
    simpleMSE,
    doubleMSE,
    tripleMSE,
    simpleExp,
    doubleExp,
    tripleExp,
    categoryInfo,
    index
  ) {
    if (simpleMSE <= doubleMSE && simpleMSE <= tripleMSE)
      categoryInfo.expected = simpleExp.forecast[simpleExp.forecast.length - 1];
    else if (doubleMSE <= simpleMSE && doubleMSE <= tripleMSE) {
      //console.log("1");
      categoryInfo.expected = doubleExp.forecast[doubleExp.forecast.length - 1];
      //console.log(doubleExp.forecast[doubleExp.forecast.length - 1]);
      //console.log(categoryInfo.expected);
    } else {
      categoryInfo.expected = tripleExp.forecast[index];
    }
    //console.log("min");
    //console.log(categoryInfo);
    //console.log(tripleExp.forecast[index]);
    return categoryInfo;
  }

  useEffect(() => {
    initCategoryInfo();
  }, [transactions]);

  return (
    <>
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      {/* <Prediction /> */}
      <section className="bg-white">
        <div className="container" style={{ padding: "0 30px" }}>
          <div className={"row"}>
            {categoriesInfo.map((cat, index) => {
              if (index % 3 === 0)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <CategoryCard
                      title={cat.category}
                      currBalance={
                        cat.monthlySums.currYear[new Date().getMonth()]
                      }
                      totalExpected={parseInt(cat.expected)}
                      icon={categoriesIcons[cat.category]}
                    />
                  </div>
                );
            })}
            {categoriesInfo.map((cat, index) => {
              if (index % 3 === 1)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <CategoryCard
                      title={cat.category}
                      currBalance={
                        cat.monthlySums.currYear[new Date().getMonth()]
                      }
                      totalExpected={parseInt(cat.expected)}
                      icon={categoriesIcons[cat.category]}
                    />
                  </div>
                );
            })}
            {categoriesInfo.map((cat, index) => {
              if (index % 3 === 2)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <CategoryCard
                      title={cat.category}
                      currBalance={
                        cat.monthlySums.currYear[new Date().getMonth()]
                      }
                      totalExpected={parseInt(cat.expected)}
                      icon={categoriesIcons[cat.category]}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
