export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TAppState = {
    status: RequestStatusType,
    error: null | string
}

const initialState: TAppState = {
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
        default:
            return state
    }
}

// Actions
export const setAppStatusAC = ((status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const)
export const setAppErrorAC = ((error: string | null) => ({type: 'APP/SET-ERROR', error}) as const)

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export  type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type AppActionsType = SetAppStatusActionType | SetAppErrorActionType
