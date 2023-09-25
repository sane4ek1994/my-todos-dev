import { handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {appActions} from "app/app-reducer";
import {handleServerAppError} from "common/utils/handleServerAppError";
import { authAPI } from "./auth-api";
import {RESULT_CODE} from "common/enums/enums";
import {LoginDataType} from "common/types/types";


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
// actions
export const authActions = slice.actions
// thunks
export const loginTC = (data: LoginDataType): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const result = await authAPI.login(data)
        if (result.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as string, dispatch)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const result = await authAPI.logout()
        if (result.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as string, dispatch)
    }
}

export const meTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const result = await authAPI.me()
        if (result.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as string, dispatch)
    } finally {
        dispatch(appActions.setIsInitialized({isInitialized: true}))
    }
}

