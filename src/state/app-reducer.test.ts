import {
    appReducer,
    setAppErrorAC,
    setAppStatusAC,
    setIsInitializedAC,
    SetIsInitializedType,
    TAppState
} from "./app-reducer";


let startState: TAppState

beforeEach(() => {
    startState = {
        isInitialized: false,
        status: "idle",
        error: null
    }
})


test('setting initialized app', () => {

    const endState = appReducer(startState, setIsInitializedAC(true))

    expect(endState.isInitialized).toBeTruthy()

})

test('changed app status', () => {
    const newStatus = 'succeeded'

    const endState = appReducer(startState, setAppStatusAC(newStatus))

    expect(endState.status).toBe(newStatus)

})

test('setting app error', () => {
    const error = 'Error network!'

    const endState = appReducer(startState, setAppErrorAC(error))

    expect(endState.error).toBe(error)
    expect(endState.error).not.toBe(null)
})