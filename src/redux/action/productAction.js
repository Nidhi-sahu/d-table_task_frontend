import axios from "axios";

export const getProducts = (params) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    const token = localStorage.getItem("token");
    

    const res = await axios.get(
      "https://d-table-backend-task.onrender.com/product/get",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params, 
      }
    );
 

    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.response?.data?.message || "Error",
    });
  }
};


export const updateProduct = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    const token = localStorage.getItem("token");

    const res = await axios.put(
      `https://d-table-backend-task.onrender.com/product/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_FAIL",
      payload: error.response?.data?.message || "Error",
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });

    const token = localStorage.getItem("token");

    await axios.delete(
      `https://d-table-backend-task.onrender.com/product/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
      payload: id,
    });

  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_FAIL",
      payload: error.response?.data?.message || "Error",
    });
  }
};

export const addProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_PRODUCT_REQUEST" });

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "https://d-table-backend-task.onrender.com/product/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "ADD_PRODUCT_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: "ADD_PRODUCT_FAIL",
      payload: error.response?.data?.message || "Error",
    });
  }
};