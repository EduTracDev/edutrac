import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./slices/authSlice";

export interface CombinedReducerType {
  auth: AuthState;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
