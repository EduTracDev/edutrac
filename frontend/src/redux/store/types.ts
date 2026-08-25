import { AuthState } from "./slices/authSlice";
import { OnboardingState } from "./slices/onboardingSlice";

export type CombinedReducerType = {
  auth: AuthState;
  onboarding: OnboardingState;
};
