import {v1} from "uuid";
import {todolistAPI, TodolistsType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType} from "./store";

export type TRemoveTodolist = ReturnType<typeof removeTodolistAC>
export type TAddTodolist = ReturnType<typeof addTodolistAC>
type TChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type TChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>
export type TSetTodolist = ReturnType<typeof setTodolistAC>
export type TTodosActions = TRemoveTodolist | TAddTodolist | TChangeTodolistTitle | TChangeTodolistFilter | TSetTodolist


export const todoListID1 = v1()
export const todoListID2 = v1()

export type TFilterTask = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistsType & {
    filter: TFilterTask
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: TTodosActions): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
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

export const addTodolistAC = (todolist: TodolistsType) => ({type: 'ADD-TODOLIST', todolist} as const)

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

export const setTodolistAC = (todos: TodolistsType[]) => ({type: 'SET-TODOLISTS', todos} as const)

//Thunks

export const getTodolistsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI.getTodolist().then(res => {
        const todos = res.data
        dispatch(setTodolistAC(todos))
    })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI.createTodolist(title).then(res => {
        const newTodos = res.data.data.item
        dispatch(addTodolistAC(newTodos))
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI.deleteTodolist(todolistId).then(() => {
        dispatch(removeTodolistAC(todolistId))
    })
}

export const updateTitleTodolistTC = (title: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI.updateTodolistTitle(title, todolistId).then(() => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    })
}