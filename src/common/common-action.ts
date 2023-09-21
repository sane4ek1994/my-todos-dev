import {createAction} from "@reduxjs/toolkit"
import {TodolistDomainType} from "features/TodolistList/todolists-reducer";
import {TTasksState} from "features/TodolistList/tasks-reducer";

export const clearTasksAndTodolists = createAction<TClearTasksAndTodolists>("common/clear-tasks-todolists")

export type TClearTasksAndTodolists = {
    tasks: TTasksState
    todolists: TodolistDomainType[]
}
