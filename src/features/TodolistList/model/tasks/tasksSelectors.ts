import { TAppRootState } from "app/store";

export const selectTasks = (state: TAppRootState) => state.tasks;
