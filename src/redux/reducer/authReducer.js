const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

   case "LOGOUT":
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
      };


    default:
      return state;
  }
};

export default authReducer;