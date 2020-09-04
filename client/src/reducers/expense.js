const INITIAL_STATE = {
  saved: false,
  deleted: false,
  fetching: false,
  showEditModal: false,
  expenseId: "",
  expenses: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, showEditModal: true };
    case "CLOSE_MODAL":
      return { ...state, showEditModal: false };
    case "EXPENSE_ID":
      return { ...state, expenseId: action.payload };
    case "EXPENSE_SAVED":
      return { ...state, saved: true, fetching: false };
    case "EXPENSE_SAVED_FALSE":
      return { ...state, saved: false };
    case "EXPENSE_DELETED":
      return { ...state, deleted: true, fetching: false };
    case "EXPENSE_DELETED_FALSE":
      return { ...state, deleted: false };
    case "EXPENSES_FETCHING":
      return { ...state, fetching: true };
    case "EXPENSES_FETCH_SUCCESS":
      return { ...state, fetching: false, expenses: action.payload };
    case "EXPENSES_FETCH_FAILED":
      return { ...state, fetching: false };
    default:
      return state;
  }
};
