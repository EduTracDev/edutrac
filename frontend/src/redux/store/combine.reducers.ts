import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import onboardingReducer from "./slices/onboardingSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
});

export default rootReducer;
