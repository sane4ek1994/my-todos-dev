import {authReducer, setIsLoggedInAC} from "./auth-reducer";

type TAuthState = {
    isLoggedIn: boolean
}

let startState: TAuthState

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('toggle is isLoggedIn', () => {

    const endState = authReducer(startState, setIsLoggedInAC(true))

    expect(endState.isLoggedIn).toBeTruthy()
})

