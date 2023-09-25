import {createAsyncThunk} from '@reduxjs/toolkit';
import {TAppRootState, AppDispatch} from "app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: TAppRootState;
    dispatch: AppDispatch;
    rejectValue: null;
}>()