import {boolean} from "yup";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TAppState = {
    isInitialized: boolean,
    status: RequestStatusType,
    error: null | string,
}

const initialState: TAppState = {
    isInitialized: false,
    status: 'loading' as RequestStatusType,
    error: null as null | string
}
export const appReducer = (state = initialState, action: AppActionsType): TAppState => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        case 'APP/SET-ERROR':
            return {
                ...state,
                error: action.error
            }
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// Actions
export const setAppStatusAC = ((status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const)
export const setAppErrorAC = ((error: string | null) => ({type: 'APP/SET-ERROR', error}) as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export  type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>

type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedType
