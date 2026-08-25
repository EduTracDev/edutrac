import { AuthState } from "./slices/authSlice";
import { OnboardingState } from "./slices/onboardingSlice";

export type CombinedReducerType = {
  state: AuthReduxState;
  auth: AuthState;
  onboarding: OnboardingState;
};
