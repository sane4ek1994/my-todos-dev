import { AnyAction } from "redux";
import { todolistsReducer } from "features/TodolistList/todolists-reducer";
import { tasksReducer } from "features/TodolistList/tasks-reducer";
import { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "app/app-reducer";
import { authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type TAppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<TAppRootState, unknown, AnyAction>;
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<TAppRootState> = useSelector;
