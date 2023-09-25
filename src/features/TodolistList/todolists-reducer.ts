import {v1} from "uuid";
import {AppThunk} from "app/store";
import {appActions, RequestStatusType} from "app/app-reducer";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError} from "common/utils/handleServerAppError";
import {todolistAPI} from "features/TodolistList/todolists-api";
import {RESULT_CODE} from "common/enums/enums";
import {TodolistsType} from "common/types/types";


export const todoListID1 = v1()
export const todoListID2 = v1()

export type TFilterTask = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistsType & {
    filter: TFilterTask,
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistsType }>) => {
            const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: "idle"}
            state.unshift(newTodolist)
        },
        changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: TFilterTask }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.filter = action.payload.filter
            }
        },
        setTodolistEntityStatus: (state, action: PayloadAction<{ entityStatus: RequestStatusType, id: string }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.entityStatus = action.payload.entityStatus
            }
        },
        setTodolists: (state, action: PayloadAction<{ todos: TodolistsType[] }>) => {
            return action.payload.todos.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }

})

export const todolistsReducer = slice.reducer

//actions
export const todolistsActions = slice.actions
//Thunks

export const getTodolistsTC = (): AppThunk => (dispatch) => {
    todolistAPI.getTodolist().then(res => {
        const todos = res.data
        dispatch(todolistsActions.setTodolists({todos}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI.createTodolist(title).then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            const newTodos = res.data.data.item
            dispatch(todolistsActions.addTodolist({todolist: newTodos}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(todolistsActions.setTodolistEntityStatus({entityStatus: 'loading', id: todolistId}))
    todolistAPI.deleteTodolist(todolistId).then(() => {
        dispatch(todolistsActions.removeTodolist({id: todolistId}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        dispatch(todolistsActions.setTodolistEntityStatus({entityStatus: 'idle', id: todolistId}))
    })
}

export const updateTitleTodolistTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI.updateTodolistTitle(title, todolistId).then(() => {
        dispatch(todolistsActions.changeTodolistTitle({id: todolistId, title}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}