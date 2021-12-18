import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [
    {
      id: 1,
      date: "2021-12-15",
      amount: -350,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 2,
      date: "2021-12-10",
      amount: -35,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 3,
      date: "2021-12-11",
      amount: 2500,
      category: "Income",
      sub_category: "Salary",
    },
    {
      id: 4,
      date: "2021-11-15",
      amount: -200,
      category: "Water",
      sub_category: "",
    },
    {
      id: 5,
      date: "2021-12-02",
      amount: -70,
      category: "Electricity",
      sub_category: "",
    },
    {
      id: 6,
      date: "2021-10-11",
      amount: -2000,
      category: "Rent",
      sub_category: "",
    },
    {
      id: 7,
      date: "2021-09-30",
      amount: -175,
      category: "Clothing",
      sub_category: "",
    },
    {
      id: 8,
      date: "2021-12-11",
      amount: 10000,
      category: "Income",
      sub_category: "Savta",
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

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        categoriesIcons,
        addTransaction,
        getCategoriesNames,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
