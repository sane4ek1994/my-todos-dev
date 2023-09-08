import {v1} from "uuid";
import {todolistAPI, TodolistsType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType} from "./store";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {RESULT_CODE} from "../api/task-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type TRemoveTodolist = ReturnType<typeof removeTodolistAC>
export type TAddTodolist = ReturnType<typeof addTodolistAC>
type TChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type TChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>
export type TSetTodolist = ReturnType<typeof setTodolistAC>
type TSetTodolistEntityStatus = ReturnType<typeof setTodolistEntityStatusAC>
export type TTodosActions =
    TRemoveTodolist
    | TAddTodolist
    | TChangeTodolistTitle
    | TChangeTodolistFilter
    | TSetTodolist
    | SetAppStatusActionType
    | TSetTodolistEntityStatus


export const todoListID1 = v1()
export const todoListID2 = v1()

export type TFilterTask = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistsType & {
    filter: TFilterTask,
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: TTodosActions): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todos.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(categories => categories.id === action.id ? {
                ...categories,
                title: action.title
            } : categories)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(filtered => filtered.id === action.id ? {...filtered, filter: action.filter} : filtered)
        case 'SET-TODOLISTS-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
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

export const setTodolistEntityStatusAC = (status: RequestStatusType, id: string) => ({
    type: 'SET-TODOLISTS-ENTITY-STATUS',
    status,
    id
} as const)

//Thunks

export const getTodolistsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI.getTodolist().then(res => {
        const todos = res.data
        dispatch(setTodolistAC(todos))
        dispatch(setAppStatusAC('succeeded'))
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title).then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            const newTodos = res.data.data.item
            dispatch(addTodolistAC(newTodos))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodolistEntityStatusAC('loading', todolistId))
    todolistAPI.deleteTodolist(todolistId).then(() => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setTodolistEntityStatusAC('idle', todolistId))
    })
}

export const updateTitleTodolistTC = (title: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolistTitle(title, todolistId).then(() => {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatusAC('succeeded'))
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}