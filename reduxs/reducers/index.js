import { combineReducers } from "redux";
import authReducer from "./auth";
import active_resetReducer from "./active_reset";

export default combineReducers({
  auth: authReducer,
  active_reset: active_resetReducer,
});
