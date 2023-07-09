import {TFilterTask, TTodoList} from "../../App";
import {v1} from "uuid";

type TAction = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: TTodoList[], action: TAction) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: v1(), title: action.title, filter: "all"}, ...state]
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

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title}
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: TFilterTask) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}