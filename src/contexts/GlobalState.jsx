import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
// Initial state

const initialState = {
  transactions: [
    {
      id: 1,
      date: "2021-01-15",
      amount: -150,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 2,
      date: "2021-02-15",
      amount: -230,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 3,
      date: "2021-03-15",
      amount: -310,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 4,
      date: "2021-04-15",
      amount: -450,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 5,
      date: "2021-05-15",
      amount: -350,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 6,
      date: "2021-06-15",
      amount: -210,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 7,
      date: "2021-07-15",
      amount: -160,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 8,
      date: "2021-08-15",
      amount: -212,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 9,
      date: "2021-09-15",
      amount: -340,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 10,
      date: "2021-10-15",
      amount: -455,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 11,
      date: "2021-11-15",
      amount: -376,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 12,
      date: "2021-12-15",
      amount: -290,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 13,
      date: "2020-01-15",
      amount: -120,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 14,
      date: "2020-02-15",
      amount: -288,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 15,
      date: "2020-03-15",
      amount: -377,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 16,
      date: "2020-04-15",
      amount: -452,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 17,
      date: "2020-05-15",
      amount: -334,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 18,
      date: "2020-06-15",
      amount: -224,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 19,
      date: "2020-07-15",
      amount: -105,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 20,
      date: "2020-08-15",
      amount: -265,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 21,
      date: "2020-09-15",
      amount: -356,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 22,
      date: "2020-10-15",
      amount: -438,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 23,
      date: "2020-11-15",
      amount: -390,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 24,
      date: "2020-12-15",
      amount: -222,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 25,
      date: "2019-01-15",
      amount: -167,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 26,
      date: "2019-02-15",
      amount: -256,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 27,
      date: "2019-03-15",
      amount: -390,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 28,
      date: "2019-04-15",
      amount: -450,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 29,
      date: "2019-05-15",
      amount: -340,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 30,
      date: "2019-06-15",
      amount: -220,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 31,
      date: "2019-07-15",
      amount: -111,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 32,
      date: "2019-08-15",
      amount: -202,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 33,
      date: "2019-09-15",
      amount: -333,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 34,
      date: "2019-10-15",
      amount: -450,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 35,
      date: "2019-11-15",
      amount: -392,
      category: "Supermarket",
      sub_category: "Shufersal",
    },
    {
      id: 36,
      date: "2019-12-15",
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
