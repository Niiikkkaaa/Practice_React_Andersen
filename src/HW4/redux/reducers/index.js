import {combineReducers} from "redux";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
const reducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default reducers;