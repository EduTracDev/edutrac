import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import client from "@/utils/client";
import {
  onboardingServices,
  OnboardingSubmitRequest,
  OnboardingSubmitResponse,
} from "@/services/onboarding.service";
import type { RootState } from "../index";

export interface OnboardingState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  data: OnboardingSubmitResponse["data"] | null;
}

const initialState: OnboardingState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  data: null,
};

export const submitOnboarding = createAsyncThunk(
  "onboarding/submit",
  async (payload: OnboardingSubmitRequest, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      if (payload.account) {
        formData.append("account", JSON.stringify(payload.account));
      }

      if (payload.website) {
        formData.append("website", JSON.stringify(payload.website));
      }

      if (payload.logo) {
        formData.append("logo", payload.logo);
      }

      if (payload.primaryBanner) {
        formData.append("primaryBanner", payload.primaryBanner);
      }

      if (payload.secondaryBanner) {
        formData.append("secondaryBanner", payload.secondaryBanner);
      }

      if (payload.gallery && payload.gallery.length > 0) {
        payload.gallery.forEach((file) => {
          formData.append("gallery", file);
        });
      }

      const response = await client.request<FormData, OnboardingSubmitResponse>({
        path: onboardingServices.submitOnboarding.path,
        method: onboardingServices.submitOnboarding.method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "Onboarding submission failed"
        );
      }

      return response;
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred during onboarding";
      return rejectWithValue(errorMsg);
    }
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    resetOnboardingState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOnboarding.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(submitOnboarding.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(submitOnboarding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOnboardingState } = onboardingSlice.actions;

const selectOnboarding = (state: RootState) => state.onboarding;

export const selectOnboardingState = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding
);
export const selectOnboardingLoading = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.isLoading
);
export const selectOnboardingData = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.data
);
export const selectOnboardingError = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.error
);

export default onboardingSlice.reducer;