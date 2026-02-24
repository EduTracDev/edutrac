import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

export interface Profile {
  id: number;
  userId: number;
  address?: string;
  city?: string;
  state?: string;
  countryCode?: string | null;
  postalCode?: string | null;
  photo?: string | null;
  createdAt: string;
  updatedAt: string;
  country?: string | null;
}

export interface Customer {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccount {
  [key: string]: unknown;
}

export interface User {
  id: number;
  uuid: string;
  email: string;
  phone?: string;
  role: string;
  name: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  lastLogin?: string;
  mfaEnabled?: boolean;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  bankAccounts?: BankAccount[];
  profile?: Profile;
  customer?: Customer;
  staff?: unknown;
  parent?: unknown;
  accessToken?: string;
  refreshToken?: string;
}

interface TokenData {
  token: string;
  _time_stamp: string;
}

export interface AuthState {
  user: User | null;
  accessToken: TokenData | null;
  refreshToken: TokenData | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  resetEmail: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isLoggingOut: false,
  resetEmail: "",
};

if (typeof window !== "undefined") {
  try {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    initialState.user = storedUser ? JSON.parse(storedUser) : null;
    initialState.accessToken = storedAccessToken
      ? { token: storedAccessToken, _time_stamp: new Date().toISOString() }
      : null;
    initialState.refreshToken = storedRefreshToken
      ? { token: storedRefreshToken, _time_stamp: new Date().toISOString() }
      : null;
  } catch {
    // ignore
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = {
        token: action.payload.accessToken,
        _time_stamp: new Date().toISOString(),
      };
      state.refreshToken = {
        token: action.payload.refreshToken,
        _time_stamp: new Date().toISOString(),
      };
      state.isLoading = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },
    setAccessToken: (state, action: PayloadAction<TokenData>) => {
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.token);
      }
    },
    setRefreshToken: (state, action: PayloadAction<TokenData>) => {
      state.refreshToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("refreshToken", action.payload.token);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    refreshAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken?: string }>
    ) => {
      state.accessToken = {
        token: action.payload.accessToken,
        _time_stamp: new Date().toISOString(),
      };
      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = {
          token: action.payload.refreshToken,
          _time_stamp: new Date().toISOString(),
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.isLoggingOut = true;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },
    setLoggingOut: (state, action: PayloadAction<boolean>) => {
      state.isLoggingOut = action.payload;
    },
    setResetEmail: (state, action: PayloadAction<string>) => {
      state.resetEmail = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("resetEmail", action.payload);
      }
    },
    clearResetEmail: (state) => {
      state.resetEmail = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("resetEmail");
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
  },
});

export const {
  setCredentials,
  setLoading,
  refreshAccessToken,
  logoutUser,
  setAccessToken,
  setRefreshToken,
  setLoggingOut,
  setResetEmail,
  clearResetEmail,
  updateUserProfile,
} = authSlice.actions;

const selectAuth = (state: { auth: AuthState }) => state.auth;

export const selectAuthState = createSelector([selectAuth], (auth) => auth);
export const selectCurrentUser = createSelector([selectAuth], (auth) => auth.user);
export const selectAccessToken = createSelector([selectAuth], (auth) => auth.accessToken);
export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => !!auth.user && !!auth.accessToken
);
export const selectIsLoading = createSelector([selectAuth], (auth) => auth.isLoading);
export const selectIsLoggingOut = createSelector([selectAuth], (auth) => auth.isLoggingOut);
export const selectResetEmail = createSelector([selectAuth], (auth) => auth.resetEmail);

export default authSlice.reducer;
