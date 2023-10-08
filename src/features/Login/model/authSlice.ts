import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "features/Login/api/auth-api";
import { RESULT_CODE } from "common/enums/enums";
import { LoginDataType } from "common/types/types";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        authThunks.logout.fulfilled,
        authThunks.login.fulfilled,
        authThunks.initializeApp.fulfilled
      ),
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      }
    );
  },
});

// thunks

const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  { data: LoginDataType }
>(`${slice.name}/login`, async ({ data }, { rejectWithValue }) => {
  const result = await authAPI.login(data);
  if (result.data.resultCode === RESULT_CODE.SUCCESS) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(result.data);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, { rejectWithValue }) => {
    const result = await authAPI.logout();
    if (result.data.resultCode === RESULT_CODE.SUCCESS) {
      return { isLoggedIn: false };
    } else {
      return rejectWithValue(null);
    }
  }
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue }) => {
    const result = await authAPI.me();
    if (result.data.resultCode === RESULT_CODE.SUCCESS) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(result.data);
    }
  }
);

export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, initializeApp };
