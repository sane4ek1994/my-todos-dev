import {Dispatch} from "redux";
import {ResponseType} from "api/todolist-api";
import {appActions} from "app/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    const error = data.messages[0]

    if (error) {
        dispatch(appActions.setAppError({error}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error.'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))

}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(appActions.setAppError({error}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<any>