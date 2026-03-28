import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import stockReducer from "./stockReducer"


const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  stock: stockReducer,
});

export default rootReducer;