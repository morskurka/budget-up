import React, { createContext, useEffect, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import {
  SimpleExponentialSmoothing,
  HoltSmoothing,
  HoltWintersSmoothing,
} from "../contexts/exponential-smoothing";

import {
  getAllTransactionsByEmail,
  deleteTransactionFromDB,
  insertTransactionToDB,
  updateTransactionOnDB,
} from "./ClientDBOperations";
import { end } from "@popperjs/core";
// Initial state

const initialState = {
  transactions: [],
  user: {},
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
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    if (state.user.email) {
      const tTransactions = await getAllTransactionsByEmail(state.user.email);
      dispatch({ type: "LOAD_USER_TRANSACTIONS", payload: tTransactions });
    }
    setLoading(false);
  }, [state.user]);

  useEffect(() => {
    setLoading(true);
    initCategoryInfo();
    setLoading(false);
  }, [state.transactions]);

  // Actions
  function addUser(user) {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  }

  async function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
    insertTransactionToDB(transaction, state.user.email);
    if (transaction.withdrawTransaction) {
      let withdrawTransaction = transaction.withdrawTransaction;
      if (Math.abs(withdrawTransaction.amount) > 0) {
        updateTransactionOnDB(withdrawTransaction);
      } else {
        deleteTransactionFromDB(withdrawTransaction);
      }
    }
  }

  async function addIncomeTransaction(transaction) {
    dispatch({
      type: "ADD_INCOME_TRANSACTION",
      payload: transaction,
    });
    insertTransactionToDB(transaction);
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
      const firstYear = getMonthlySums(cat, year - 1);
      const secondYear = getMonthlySums(cat, year - 2);
      const thirdYear = getMonthlySums(cat, year - 3);

      let categoryInfo = {
        category: cat,
        monthlySums: {
          currYear: currYear,
          firstYear: firstYear,
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
    let currMonth = new Date().getMonth();

    const data = [
      //...categoryInfo.monthlySums.thirdYear.slice(currMonth),
      ...categoryInfo.monthlySums.secondYear.slice(currMonth),
      ...categoryInfo.monthlySums.firstYear,
      ...categoryInfo.monthlySums.currYear.slice(0, currMonth),
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
    if (simpleMSE <= doubleMSE && simpleMSE <= tripleMSE) {
      categoryInfo.expected = simpleExp.forecast[simpleExp.data.length];
    } else if (doubleMSE <= simpleMSE && doubleMSE <= tripleMSE) {
      categoryInfo.expected = doubleExp.forecast[doubleExp.data.length];
    } else {
      categoryInfo.expected = tripleExp.forecast[tripleExp.data.length];
    }
    return categoryInfo;
  }

  const loadingJSX = (
    <div className="h-100 row align-items-center justify-content-center mt-5">
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-grow text-primary me-2" role="status"></div>
        <div className="spinner-grow text-secondary me-2" role="status"></div>
        <div className="spinner-grow text-success me-2" role="status"></div>
        <div className="spinner-grow text-danger me-2" role="status"></div>
        <div className="spinner-grow text-warning me-2" role="status"></div>
        <div className="spinner-grow text-info me-2" role="status"></div>
      </div>
    </div>
  );

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        categoriesIcons,
        addTransaction,
        addIncomeTransaction,
        getCategoriesNames,
        categoriesInfo: state.categoriesInfo,
        addCategoryInfo,
        addUser,
        user: state.user,
      }}
    >
      {loading ? loadingJSX : children}
    </GlobalContext.Provider>
  );
};
