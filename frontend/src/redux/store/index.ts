"use client";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./combine.reducers";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "onboarding/submit/pending",
          "onboarding/submit/fulfilled",
        ],
        ignoredPaths: ["auth", "onboarding"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
