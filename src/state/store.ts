import {AnyAction, combineReducers} from "redux";
import {todolistsReducer} from "features/TodolistList/todolists-reducer";
import {tasksReducer} from "features/TodolistList/tasks-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "app/app-reducer";
import {authReducer} from "features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
    reducer: rootReducer
})

export type TAppRootState = ReturnType<typeof store.getState>
export type ThunkType = ThunkDispatch<TAppRootState, unknown, AnyAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TAppRootState, unknown, AnyAction>
export const useAppDispatch = useDispatch<ThunkType>
export const useAppSelector: TypedUseSelectorHook<TAppRootState> = useSelector