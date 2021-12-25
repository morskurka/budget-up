import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [
    {
      id: 1,
      date: "2021-01-15",
      amount: -100,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 2,
      date: "2021-02-15",
      amount: -200,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 3,
      date: "2021-03-15",
      amount: -300,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 4,
      date: "2021-04-15",
      amount: -400,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 5,
      date: "2021-05-15",
      amount: -500,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 6,
      date: "2021-06-15",
      amount: -600,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 7,
      date: "2021-07-15",
      amount: -700,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 8,
      date: "2021-08-15",
      amount: -800,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 9,
      date: "2021-09-15",
      amount: -900,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 10,
      date: "2021-10-15",
      amount: -901,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 11,
      date: "2021-11-15",
      amount: -902,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 12,
      date: "2021-12-15",
      amount: -903,
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
      date: "2021-12-11",
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
  };

  // Actions
  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
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
