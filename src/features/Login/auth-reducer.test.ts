import {authActions, authReducer} from "./auth-reducer";

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

    const endState = authReducer(startState, authActions.setIsLoggedIn({isLoggedIn: true}))

    expect(endState.isLoggedIn).toBeTruthy()
})

