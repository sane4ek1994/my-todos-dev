import { TAppRootState } from "app/store";

export const selectTodolists = (state: TAppRootState) => state.todolists;
