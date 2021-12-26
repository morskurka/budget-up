import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
// Initial state

const initialState = {
  transactions: [
    {
      id: 1,
      tDate: "2021-12-15",
      amount: -350,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 2,
      tDate: "2021-12-10",
      amount: -35,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 3,
      tDate: "2021-12-11",
      amount: 2500,
      category: "Income",
      sub_category: "Salary",
    },
    {
      id: 4,
      tDate: "2021-11-15",
      amount: -200,
      category: "Water",
      sub_category: "",
    },
    {
      id: 5,
      tDate: "2021-12-02",
      amount: -70,
      category: "Electricity",
      sub_category: "",
    },
    {
      id: 6,
      tDate: "2021-10-11",
      amount: -2000,
      category: "Rent",
      sub_category: "",
    },
    {
      id: 7,
      tDate: "2021-09-30",
      amount: -175,
      category: "Clothing",
      sub_category: "",
    },
    {
      id: 8,
      tDate: "2021-12-11",
      amount: 10000,
      category: "Income",
      sub_category: "Savta",
    },
    {
      id: 9,
      tDate: "2021-12-15",
      amount: -100,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 10,
      tDate: "2021-12-10",
      amount: -100,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 11,
      tDate: "2020-12-11",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 12,
      tDate: "2020-03-15",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 13,
      tDate: "2020-12-02",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 14,
      tDate: "2020-10-11",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 15,
      tDate: "2020-09-30",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
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

  useEffect(async () => {
    const res = await fetch("/transactions");
    console.log(res);
    const tTransactions = await res.json();
    dispatch({ type: "LOAD_USER_TRANSACTIONS", payload: tTransactions });
  }, []);

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
