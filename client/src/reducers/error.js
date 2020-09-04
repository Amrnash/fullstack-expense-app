const INITIAL_STATE = {
  message: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, message: action.payload };
    case "CLEAR_ERROR":
      return { ...state, message: "" };
    default:
      return state;
  }
};
