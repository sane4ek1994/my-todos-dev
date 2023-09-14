import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    const err = data.messages[0]

    if (err) {
        dispatch(setAppErrorAC(err))
    } else {
        dispatch(setAppErrorAC('Some error.'))
    }
    dispatch(setAppStatusAC('failed'))

}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>