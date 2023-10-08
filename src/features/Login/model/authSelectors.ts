import { TAppRootState } from "app/store";

export const selectIsLoggedIn = (state: TAppRootState) => state.auth.isLoggedIn;
