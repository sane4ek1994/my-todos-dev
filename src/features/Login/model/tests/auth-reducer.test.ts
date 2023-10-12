import { authActions, authSlice } from "features/Login/model/authSlice";

type TAuthState = {
  captcha: string | null;
  isLoggedIn: boolean;
};

let startState: TAuthState;

beforeEach(() => {
  startState = {
    captcha: null,
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
