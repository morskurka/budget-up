export default (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      // get withdrawTransaction from payload
      let withdrawTransaction = action.payload.withdrawTransaction;
      let newTransactions = state.transactions;
      // delete if amount == 0
      if (withdrawTransaction.amount === 0) {
        newTransactions = state.transactions.filter(
          (t) => withdrawTransaction.id !== t.id
        );
      }
      // update sum if amount > 0
      else {
        state.transactions.forEach((t) => {
          if (t.id === withdrawTransaction.id) {
            t.amount = withdrawTransaction.amount;
          }
        });
      }
      let newTransaction = { ...action.payload };
      delete newTransaction.withdrawTransaction;
      return {
        ...state,
        transactions: [newTransaction, ...newTransactions],
      };

    case "ADD_INCOME_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "LOAD_USER_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };

    case "ADD_CATEGORY_INFO":
      return {
        ...state,
        categoriesInfo: [action.payload, ...state.categoriesInfo],
      };

    case "RESET_CATEGORIES_INFO":
      return {
        ...state,
        categoriesInfo: [],
      };
    default:
      return state;
  }
};
