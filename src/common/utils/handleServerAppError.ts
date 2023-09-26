import {appActions} from "app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "common/types/types";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    const error = data.messages[0]

    if (error) {
        dispatch(appActions.setAppError({error}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error.'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))

}
