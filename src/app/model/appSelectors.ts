import { TAppRootState } from "app/store";

export const selectIsInitialized = (state: TAppRootState) =>
  state.app.isInitialized;
export const selectStatus = (state: TAppRootState) => state.app.status;
