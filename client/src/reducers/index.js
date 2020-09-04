import { combineReducers } from "redux";
import errorReducer from "./error";
import authReducer from "./auth";
import expenseReducer from "./expense";

const reducers = combineReducers({
  error: errorReducer,
  auth: authReducer,
  expense: expenseReducer,
});

export default reducers;
