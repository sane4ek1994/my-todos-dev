import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { authAPI } from "./auth-api";
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
    builder
      .addCase(authThunks.login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(authThunks.logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(authThunks.initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

// thunks

const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  { data: LoginDataType }
>(`${slice.name}/login`, async ({ data }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const result = await authAPI.login(data);
    if (result.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: true };
    } else {
      handleServerAppError(result.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e as string, dispatch);
    return rejectWithValue(null);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const result = await authAPI.logout();
      if (result.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: false };
      } else {
        handleServerAppError(result.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e as string, dispatch);
      return rejectWithValue(null);
    }
  }
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const result = await authAPI.me();
      if (result.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      }
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return rejectWithValue(null);
    } catch (e) {
      handleServerNetworkError(e as string, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(appActions.setIsInitialized({ isInitialized: true }));
    }
  }
);

export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const authThunks = { login, logout, initializeApp };
