const initialState = {
  products: [],
  loading: false,
  error: null,
  totalPages: 1,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_REQUEST":
      return { ...state, loading: true };

    case "PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        totalPages: action.payload.totalPages || 1,
      };

    case "PRODUCT_FAIL":
      return { ...state, loading: false, error: action.payload };

  
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload),
      };

  
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };

      
case "ADD_PRODUCT_SUCCESS":
  return {
    ...state,
    products: [action.payload, ...state.products],
  };

    default:
      return state;
  }
};

export default productReducer;