import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type TAppRootState = ReturnType<typeof rootReducer>
export type ThunkType = ThunkDispatch<TAppRootState, any, AnyAction>

export const useAppDispatch = useDispatch<ThunkType>
export const useAppSelector: TypedUseSelectorHook<TAppRootState> = useSelector