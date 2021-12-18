import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [
    {
      id: 1,
      date: "2021-12-15",
      amount: -100,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 2,
      date: "2021-12-10",
      amount: -100,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 3,
      date: "2020-12-11",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 4,
      date: "2020-3-15",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 5,
      date: "2020-12-02",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 6,
      date: "2020-10-11",
      amount: -100,
      category: "Supermarket",
      sub_category: "",
    },
    {
      id: 7,
      date: "2020-09-30",
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
      date: "11/12/2021",
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

  // Actions
  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
