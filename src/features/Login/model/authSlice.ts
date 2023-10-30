import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "features/Login/api/auth-api";
import { RESULT_CODE } from "common/enums/enums";
import { LoginDataType } from "common/types/types";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";

type AuthSliceType = {
  captcha: string | null;
  isLoggedIn: boolean;
};

const initialState: AuthSliceType = {
  captcha: null,
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.captcha.fulfilled, (state, action) => {
        state.captcha = action.payload.url;
      })
      .addMatcher(
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

const captcha = createAppAsyncThunk<{ url: null | string }, undefined>(
  `${slice.name}/captcha`,
  async (_, { rejectWithValue }) => {
    const result = await authAPI.getCaptcha();
    if (result.status === 200) {
      return { url: result.data.url };
    } else {
      return rejectWithValue(null);
    }
  }
);

const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  { data: LoginDataType }
>(`${slice.name}/login`, async ({ data }, { dispatch, rejectWithValue }) => {
  const result = await authAPI.login(data);
  if (result.data.resultCode === RESULT_CODE.CATCH) {
    dispatch(captcha());
  }
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
export const authThunks = { login, logout, initializeApp, captcha };
