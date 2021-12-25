import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import {
  SimpleExponentialSmoothing,
  HoltSmoothing,
  HoltWintersSmoothing,
} from "../contexts/exponential-smoothing";

const Prediction = () => {
  const [displayCategoryList, setDisplayCategoryList] = useState(false);
  const { transactions, getCategoriesNames, categoriesInfo, addCategoryInfo } =
    useContext(GlobalContext);
  const categoriesName = getCategoriesNames();

  // initialize the categoryInfo array when the user first signed up
  function initCategoryInfo() {
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
      console.log("init");
      console.log(categoryInfo);
      addCategoryInfo(categoryInfo);
      console.log("after");
      console.log(categoriesInfo);
    });
  }

  // get monthly sums for single year in specific category
  function getMonthlySums(category, year) {
    let res = new Array(12).fill(0);
    const MonthlySums = transactions
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
      }, res);
    return MonthlySums;
  }

  // find the most suitable EX method for each category
  function chooseExMethod(categoryInfo) {
    let simplePrediction = [];
    let doublePrediction = [];
    let triplePrediction = [];
    let simpleMSE = 0;
    let doubleMSE = 0;
    let tripleMSE = 0;

    const data = [
      ...categoryInfo.monthlySums.thirdYear,
      ...categoryInfo.monthlySums.secondYear,
      ...categoryInfo.monthlySums.currYear,
    ];

    let simpleExp = new SimpleExponentialSmoothing(data, 0.5);
    let doubleExp = new HoltSmoothing(data, 0.5, 0.5);
    let tripleExp = new HoltWintersSmoothing(data, 0.5, 0.5, 0.5, 4, true);
    simpleExp.optimizeParameter(10);
    doubleExp.optimizeParameters(10);
    tripleExp.optimizeParameters(10);
    if (categoryInfo.category === "Supermarket") {
      console.log(simpleExp);
      console.log(doubleExp);
      console.log(tripleExp);
    }
    simpleMSE = simpleExp.computeMeanSquaredError();
    doubleMSE = doubleExp.computeMeanSquaredError();
    tripleMSE = tripleExp.computeMeanSquaredError();
    if (categoryInfo.category === "Supermarket") {
      console.log(simpleMSE);
      console.log(doubleMSE);
      console.log(tripleMSE);
    }
    categoryInfo = findMinMSE(
      simpleMSE,
      doubleMSE,
      tripleMSE,
      simpleExp,
      doubleExp,
      tripleExp,
      categoryInfo
    );
    console.log("choose");
    console.log(categoryInfo);
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
    categoryInfo
  ) {
    if (simpleMSE <= doubleMSE && simpleMSE <= tripleMSE)
      categoryInfo.expected = simpleExp.forecast[simpleExp.forecast.length - 1];
    else if (doubleMSE <= simpleMSE && doubleMSE <= tripleMSE) {
      console.log("1");
      categoryInfo.expected = doubleExp.forecast[doubleExp.forecast.length - 1];
      console.log(doubleExp.forecast[doubleExp.forecast.length - 1]);
      console.log(categoryInfo.expected);
    } else
      categoryInfo.expected = tripleExp.forecast[tripleExp.forecast.length - 1];
    console.log("min");
    console.log(categoryInfo);
    return categoryInfo;
  }

  return (
    <>
      {displayCategoryList ? (
        <p>prediction</p>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <div className="text-center">
                <div
                  className="btn btn-primary"
                  onClick={() => initCategoryInfo()}
                >
                  login
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Prediction;
