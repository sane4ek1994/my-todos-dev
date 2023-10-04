import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) => {
      state.status = action.payload.status;
    },
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
});
export const appReducer = slice.reducer;
export const appActions = slice.actions;
