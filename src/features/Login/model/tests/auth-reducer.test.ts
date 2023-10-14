import {
  authActions,
  authSlice,
  authThunks,
} from "features/Login/model/authSlice";

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

test("get captcha", () => {
  const endState = authSlice(
    startState,
    authThunks.captcha.fulfilled({ url: "test_link" }, "requestId", undefined)
  );

  expect(startState.captcha).toBeNull();
  expect(endState.captcha).not.toBeNull();
  expect(typeof endState.captcha).toBe("string");
});
