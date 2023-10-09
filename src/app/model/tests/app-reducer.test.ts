import { appActions, appSlice, TAppState } from "app/model/appSlice";

let startState: TAppState;

beforeEach(() => {
  startState = {
    isInitialized: false,
    status: "idle",
    error: null,
  };
});

test("setting initialized app", () => {
  const endState = appSlice(
    startState,
    appActions.setIsInitialized({ isInitialized: true })
  );

  expect(endState.isInitialized).toBeTruthy();
});

test("setting app error", () => {
  const error = "Error network!";

  const endState = appSlice(startState, appActions.setAppError({ error }));

  expect(endState.error).toBe(error);
  expect(endState.error).not.toBe(null);
});
