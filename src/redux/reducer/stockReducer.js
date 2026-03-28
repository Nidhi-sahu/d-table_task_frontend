const initialState = {
  loading: false,
  success: false,
  error: null,
  stockData: [], 
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {

    
    case "STOCK_UPDATE_REQUEST":
      return { ...state, loading: true };

    case "STOCK_UPDATE_SUCCESS":
      return { ...state, loading: false, success: true };

    case "STOCK_UPDATE_FAIL":
      return { ...state, loading: false, error: action.payload };

   
    case "GET_STOCK_REQUEST":
      return { ...state, loading: true };

    case "GET_STOCK_SUCCESS":
      return {
        ...state,
        loading: false,
        stockData: action.payload, 
      };

    case "GET_STOCK_FAIL":
      return { ...state, loading: false, error: action.payload };

      case "STOCK_RESET":
  return { ...state, success: false, error: null };

    default:
      return state;
  }
};

export default stockReducer;