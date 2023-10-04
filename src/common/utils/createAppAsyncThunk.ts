import { createAsyncThunk } from "@reduxjs/toolkit";
import { TAppRootState, AppDispatch } from "app/store";
import { BaseResponseType } from "common/types/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: TAppRootState;
  dispatch: AppDispatch;
  rejectValue: null | BaseResponseType;
}>();
