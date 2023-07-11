import {TTasks} from "../TodoList";
import {v1} from "uuid";


export type TRemoveTask = {
    type: 'REMOVE-TASK'
    todolistId: string
    id: string
}


export type TAddTask = {
    type: 'ADD-TASK'
    todolistId: string
    id: string
    title: string
}

export type TChangeTitleTask = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    todolistId: string,
    title: string

}

export type TChangeIsDoneTask = {
    type: 'CHANGE-TASK-ISDONE',
    categoryId: string,
    todolistId: string,
    isDone: boolean
}


export type TTasksState = {
    [key: string]: TTasks[]
}

type TActions = TRemoveTask | TAddTask | TChangeTitleTask | TChangeIsDoneTask

export const tasksReducer = (state: TTasksState, action: TActions): TTasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(list => list.id === action.id ? {
                    ...list,
                    title: action.title
                } : list)
            }
        case "CHANGE-TASK-ISDONE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(list => list.id === action.categoryId ? {
                    ...list,
                    isDone: action.isDone
                } : list)
            }
        default:
            throw new Error('I don\'t understand this type Task reducer')
    }
}

export const removeTasksAC = (todolistId: string, id: string): TRemoveTask => {
    return {type: 'REMOVE-TASK', todolistId, id}
}

export const addTaskAC = (todolistId: string, id: string, title: string): TAddTask => {
    return {type: 'ADD-TASK', todolistId, id, title}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): TChangeTitleTask => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, id, title}
}

export const changeTaskIsDoneAC = (todolistId: string, categoryId: string, isDone: boolean): TChangeIsDoneTask => {
    return {type: 'CHANGE-TASK-ISDONE', todolistId, categoryId, isDone}
}