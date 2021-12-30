import React, { createContext, useEffect, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import {
  SimpleExponentialSmoothing,
  HoltSmoothing,
  HoltWintersSmoothing,
} from "../contexts/exponential-smoothing";
// Initial state

const initialState = {
  transactions: [
    {
      id: 1,
      tDate: "2021-01-15",
      amount: -150,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 2,
      tDate: "2021-02-15",
      amount: -230,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 3,
      tDate: "2021-03-15",
      amount: -310,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 4,
      tDate: "2021-04-15",
      amount: -450,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 5,
      tDate: "2021-05-15",
      amount: -350,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 6,
      tDate: "2021-06-15",
      amount: -210,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 7,
      tDate: "2021-07-15",
      amount: -160,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 8,
      tDate: "2021-08-15",
      amount: -212,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 9,
      tDate: "2021-09-15",
      amount: -340,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 10,
      tDate: "2021-10-15",
      amount: -455,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 11,
      tDate: "2021-11-15",
      amount: -376,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 12,
      tDate: "2021-12-15",
      amount: -290,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 13,
      tDate: "2020-01-15",
      amount: -120,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 14,
      tDate: "2020-02-15",
      amount: -288,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 15,
      tDate: "2020-03-15",
      amount: -377,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 16,
      tDate: "2020-04-15",
      amount: -452,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 17,
      tDate: "2020-05-15",
      amount: -334,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 18,
      tDate: "2020-06-15",
      amount: -224,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 19,
      tDate: "2020-07-15",
      amount: -105,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 20,
      tDate: "2020-08-15",
      amount: -265,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 21,
      tDate: "2020-09-15",
      amount: -356,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 22,
      tDate: "2020-10-15",
      amount: -438,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 23,
      tDate: "2020-11-15",
      amount: -390,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 24,
      tDate: "2020-12-15",
      amount: -222,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 25,
      tDate: "2019-01-15",
      amount: -167,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 26,
      tDate: "2019-02-15",
      amount: -256,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 27,
      tDate: "2019-03-15",
      amount: -390,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 28,
      tDate: "2019-04-15",
      amount: -450,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 29,
      tDate: "2019-05-15",
      amount: -340,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 30,
      tDate: "2019-06-15",
      amount: -220,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 31,
      tDate: "2019-07-15",
      amount: -111,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 32,
      tDate: "2019-08-15",
      amount: -202,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 33,
      tDate: "2019-09-15",
      amount: -333,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 34,
      tDate: "2019-10-15",
      amount: -450,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 35,
      tDate: "2019-11-15",
      amount: -392,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 36,
      tDate: "2019-12-15",
      amount: -233,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
  ],
  user: {
    user_id: 1,
    email: "elnn.sh@gmail.com",
    firstName: "Shuky",
    lastName: "Shukrun",
    phone: "058-5003008",
    password: "123123",
  },
  events: [
    {
      id: 1,
      title: "Birth Day",
      tDate: "2021-12-11",
      amount: 3000,
    },
  ],
  predictionParams: [
    {
      category: "Supermarket",
      simple_alpha: 0.4,
      double_alpha: 0.2,
      double_beta: 0.6,
      triple_alpha: 0.1,
      triple_beta: 0.5,
      triple_gamma: 0.7,
    },
    {
      category: "Water",
      simple_alpha: 0.2,
      double_alpha: 0.4,
      double_beta: 0.6,
      triple_alpha: 0.1,
      triple_beta: 0.8,
      triple_gamma: 0.3,
    },
  ],
  categoriesInfo: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const categoriesIcons = {
    Supermarket: "cart3",
    Electricity: "plug",
    Water: "droplet",
    Income: "cash",
    Restaurants: "cup-straw", // MISSING
    "Mortgage / Rent": "house",
    "Cosmetics & Personal Care": "brush",
    "Property Tax": "house-door",
    TV: "tv",
    "Furniture & Household Equipment": "building",
    Clothing: "bag", // MISSING
    "Health Insurance / HMO": "thermometer-snow",
    "Pharmacy, Specialist Doctor": "bandaid",
    "Education & Classes": "mortarboard",
    Entertainments: "film",
    "Office Supplies": "paperclip",
    Internet: "globe",
    Cellular: "telephone",
    "Public Transport": "truck",
    Vacations: "dice-3",
    "Donations & Taxes": "currency-exchange",
    "Various Expenses": "palette2", // MISSING
    "Car Insurance": "shield-plus", // MISSING
    "Car Maintenance": "cone-striped", // MISSING
    Gas: "truck", // MISSING
    Newspapers: "newspaper",
    Saving: "piggy-bank",
    "Cash withdrawals": "cash-stack",
    "Bank Commissions": "bank2",
  };

  useEffect(async () => {
    const res = await fetch("/api/transactions");
    const tTransactions = await res.json();
    dispatch({ type: "LOAD_USER_TRANSACTIONS", payload: tTransactions });
  }, []);

  useEffect(() => {
    initCategoryInfo();
  }, [state.transactions]);

  // Actions
  async function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
    const res = await fetch("/api/transactions/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(transaction), // body data type must match "Content-Type" header
    });
  }

  function getCategoriesNames() {
    // get all categories names
    let categoriesSet = new Set();
    state.transactions.forEach((trans) => categoriesSet.add(trans.category));
    return Array.from(categoriesSet);
  }

  function addCategoryInfo(categoryInfo) {
    dispatch({
      type: "ADD_CATEGORY_INFO",
      payload: categoryInfo,
    });
  }

  function resetCategoriesInfo() {
    dispatch({
      type: "RESET_CATEGORIES_INFO",
      payload: [],
    });
  }

  // initialize the categoryInfo array when the user first signed up
  function initCategoryInfo() {
    resetCategoriesInfo();
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
      addCategoryInfo(categoryInfo);
    });
  }

  // get monthly sums for single year in specific category
  function getMonthlySums(category, year) {
    let res = new Array(12).fill(0);
    const MonthlySums = state.transactions
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

    const data = [
      ...categoryInfo.monthlySums.thirdYear,
      ...categoryInfo.monthlySums.secondYear,
      ...categoryInfo.monthlySums.currYear.slice(0, new Date().getMonth() + 1),
    ];

    let simpleExp = new SimpleExponentialSmoothing(data, 0.5);
    let doubleExp = new HoltSmoothing(data, 0.5, 0.5);
    let tripleExp = new HoltWintersSmoothing(data, 0.5, 0.5, 0.5, 12, true);

    simpleExp.optimizeParameter(10);
    doubleExp.optimizeParameters(10);
    tripleExp.optimizeParameters(10);

    simpleExp.predict();
    doubleExp.predict();
    tripleExp.predict();

    simpleMSE = simpleExp.computeMeanSquaredError();
    doubleMSE = doubleExp.computeMeanSquaredError();
    tripleMSE = tripleExp.computeMeanSquaredError();

    categoryInfo = findMinMSE(
      simpleMSE,
      doubleMSE,
      tripleMSE,
      simpleExp,
      doubleExp,
      tripleExp,
      categoryInfo
    );

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
      categoryInfo.expected = doubleExp.forecast[doubleExp.forecast.length - 1];
    } else {
      categoryInfo.expected = tripleExp.forecast[tripleExp.data.length - 1];
    }

    return categoryInfo;
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        categoriesIcons,
        addTransaction,
        getCategoriesNames,
        categoriesInfo: state.categoriesInfo,
        addCategoryInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
