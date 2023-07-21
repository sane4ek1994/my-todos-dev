import {TFilterTask, TTodoList} from "../App";
import {v1} from "uuid";

export type TRemoveTodolist = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type TAddTodolist = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

type TChangeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

type TChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: TFilterTask
}

type TActions = TRemoveTodolist | TAddTodolist | TChangeTodolistTitle | TChangeTodolistFilter

export const todolistsReducer = (state: TTodoList[], action: TActions): TTodoList[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(categories => categories.id === action.id ? {
                ...categories,
                title: action.title
            } : categories)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(filtered => filtered.id === action.id ? {...filtered, filter: action.filter} : filtered)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTodolistAC = (id: string): TRemoveTodolist => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): TAddTodolist => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): TChangeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: TFilterTask): TChangeTodolistFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}