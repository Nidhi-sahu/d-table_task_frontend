

import axios from "axios";

export const updateStock = (data) => async (dispatch) => {
  try {
    dispatch({ type: "STOCK_UPDATE_REQUEST" });

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/stock/updatestock",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log("API Response:", res.data);
    dispatch({
      type: "STOCK_UPDATE_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: "STOCK_UPDATE_FAIL",
      payload: error.response?.data?.message || "Error",
    });
  }
};

export const getStock = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_STOCK_REQUEST" });

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/stock/getstock",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "GET_STOCK_SUCCESS",
      payload: res.data.data, // ✅ .data.data — backend { data: history } bhejta hai
    });

  } catch (error) {
    dispatch({
      type: "GET_STOCK_FAIL",
      payload: error.response?.data?.message || "Error",
    });
  }
};