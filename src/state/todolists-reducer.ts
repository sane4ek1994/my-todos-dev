import {v1} from "uuid";
import {TodolistsType} from "../api/todolist-api";

export type TRemoveTodolist = ReturnType<typeof removeTodolistAC>
export type TAddTodolist = ReturnType<typeof addTodolistAC>
type TChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type TChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>
type TActions = TRemoveTodolist | TAddTodolist | TChangeTodolistTitle | TChangeTodolistFilter

export const todoListID1 = v1()
export const todoListID2 = v1()

export type TFilterTask = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistsType & {
    filter: TFilterTask
}

const initialState: TodolistDomainType[] = [
    {id: todoListID1, title: 'Todo list', filter: 'all', addedDate: '', order: 0},
    {id: todoListID2, title: 'Hobby list', filter: 'active', addedDate: '', order: 0},
]

export const todolistsReducer = (state = initialState, action: TActions): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId, title: action.title, filter: "all", addedDate: '',
                order: 0
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(categories => categories.id === action.id ? {
                ...categories,
                title: action.title
            } : categories)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(filtered => filtered.id === action.id ? {...filtered, filter: action.filter} : filtered)
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)

export const changeTodolistFilterAC = (id: string, filter: TFilterTask) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)