export default (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "ADD_CATEGORY_INFO":
      return {
        ...state,
        categoriesInfo: [action.payload, ...state.categoriesInfo],
      };
    default:
      return state;
  }
};
