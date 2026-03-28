import axios from "axios";

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const res = await axios.post(
      "http://localhost:5000/auth/login",
      data,
      { withCredentials: true }
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });

    localStorage.setItem("token", res.data.token);
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response?.data?.message || "Login Failed",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log("Logout API error", error);
  }

  localStorage.removeItem("token");

  dispatch({ type: "LOGOUT" });
};