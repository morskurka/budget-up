import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [
    {
      id: 1,
      date: "15/12/2021",
      amount: -350,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 2,
      date: "10/12/2021",
      amount: -35,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 3,
      date: "11/12/2021",
      amount: 2500,
      category: "Salary",
      sub_category: "",
    },
    {
      id: 4,
      date: "15/11/2021",
      amount: -200,
      category: "Water",
      sub_category: "",
    },
    {
      id: 5,
      date: "02/12/2021",
      amount: -70,
      category: "Electricity",
      sub_category: "",
    },
    {
      id: 6,
      date: "11/10/2021",
      amount: -2000,
      category: "Rent",
      sub_category: "",
    },
    {
      id: 7,
      date: "30/09/2021",
      amount: -175,
      category: "Clothing",
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
