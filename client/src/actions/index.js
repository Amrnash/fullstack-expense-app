export const loggedIn = () => {
  return {
    type: "LOGGEDIN",
  };
};
export const loggedOut = () => {
  return {
    type: "LOGGEDOUT",
  };
};
export const authAttempting = () => {
  return {
    type: "AUTH_ATTEMPTING",
  };
};
export const authFailed = () => {
  return {
    type: "AUTH_FAILED",
  };
};
// ERROR ACTIONS
export const setError = (error) => {
  return {
    type: "SET_ERROR",
    payload: error,
  };
};
export const clearError = () => {
  return {
    type: "CLEAR_ERROR",
  };
};
export const userFetched = (user) => {
  return {
    type: "USER_FETCHED",
    payload: user,
  };
};
// EXPENSE ACTIONS
export const expensesFetchSuccess = (expenses) => {
  return {
    type: "EXPENSES_FETCH_SUCCESS",
    payload: expenses,
  };
};
export const expensesFetchFailed = () => {
  return {
    type: "EXPENSES_FETCH_FAILED",
  };
};
export const expensesFetching = () => {
  return {
    type: "EXPENSES_FETCHING",
  };
};
export const expenseSaved = () => {
  return {
    type: "EXPENSE_SAVED",
  };
};
export const resetExpenseSaved = () => {
  return {
    type: "EXPENSE_SAVED_FALSE",
  };
};
export const expenseDeleted = () => {
  return {
    type: "EXPENSE_DELETED",
  };
};
export const resetExpenseDeleted = () => {
  return {
    type: "EXPENSE_DELETED_FALSE",
  };
};
export const showEditModal = () => {
  return {
    type: "SHOW_MODAL",
  };
};
export const closeEditModal = () => {
  return {
    type: "CLOSE_MODAL",
  };
};
export const expenseId = (id) => {
  return {
    type: "EXPENSE_ID",
    payload: id,
  };
};
