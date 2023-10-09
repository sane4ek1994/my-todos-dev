import { createAction } from "@reduxjs/toolkit";
import { TodolistDomainType } from "features/TodolistList/model/todolists/todolistsSlice";
import { TTasksState } from "features/TodolistList/model/tasks/tasksSlice";

export const clearTasksAndTodolists = createAction<TClearTasksAndTodolists>(
  "common/clear-tasks-todolists"
);

export type TClearTasksAndTodolists = {
  tasks: TTasksState;
  todolists: TodolistDomainType[];
};
