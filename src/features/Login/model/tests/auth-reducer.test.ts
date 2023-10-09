import { authActions, authSlice } from "features/Login/model/authSlice";

type TAuthState = {
  isLoggedIn: boolean;
};

let startState: TAuthState;

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test("toggle is isLoggedIn", () => {
  const endState = authSlice(
    startState,
    authActions.setIsLoggedIn({ isLoggedIn: true })
  );

  expect(endState.isLoggedIn).toBeTruthy();
});
