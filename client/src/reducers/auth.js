const INITIAL_STATE = {
  attempting: false,
  loggedIn: false,
  user: {},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_ATTEMPTING":
      return { ...state, attempting: true };
    case "AUTH_FAILED":
      return { ...state, attempting: false };
    case "LOGGEDIN":
      return { ...state, loggedIn: true, attempting: false };
    case "LOGGEDOUT":
      return { ...state, loggedIn: false };
    case "USER_FETCHED":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
