import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { authThunks } from "features/Login/model/authSlice";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type TAppState = {
  isInitialized: boolean;
  status: RequestStatusType;
  error: null | string;
};

const slice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "loading" as RequestStatusType,
    error: null as null | string,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setIsInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>
    ) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          authThunks.initializeApp.fulfilled,
          authThunks.initializeApp.rejected
        ),
        (state) => {
          state.isInitialized = true;
        }
      )
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "idle";
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed";
        if (action.payload) {
          if (action.type.includes("createTodolist")) return;
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message
            ? action.error.message
            : "Some error occurred";
        }
      });
  },
});
export const appSlice = slice.reducer;
export const appActions = slice.actions;
