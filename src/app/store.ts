import { AnyAction } from "redux";
import { todolistsSlice } from "features/TodolistList/model/todolists/todolistsSlice";
import { tasksSlice } from "features/TodolistList/model/tasks/tasksSlice";
import { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { appSlice } from "app/model/appSlice";
import { authSlice } from "features/Login/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
  reducer: {
    todolists: todolistsSlice,
    tasks: tasksSlice,
    app: appSlice,
    auth: authSlice,
  },
});

export type TAppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<TAppRootState, unknown, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<TAppRootState> = useSelector;
