import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer, TTodosActions} from "../features/TodolistList/todolists-reducer";
import {tasksReducer, TTaskActions} from "../features/TodolistList/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppActionsType = TTodosActions | TTaskActions
export type TAppRootState = ReturnType<typeof rootReducer>
export type ThunkType = ThunkDispatch<TAppRootState, unknown, AppActionsType>

export const useAppDispatch = useDispatch<ThunkType>
export const useAppSelector: TypedUseSelectorHook<TAppRootState> = useSelector