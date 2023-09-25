import {AppThunk, TAppRootState} from "app/store";
import { handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {appActions} from "app/app-reducer";
import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "features/TodolistList/todolists-reducer";
import {clearTasksAndTodolists} from "common/common-action";
import {TaskType, UpdateTaskModelType} from "common/types/types";
import {handleServerAppError} from "common/utils/handleServerAppError";
import { taskAPI } from "./task-api";
import {RESULT_CODE, TaskStatuses, TodoTaskPriorities} from "common/enums/enums";


export type TTasksState = {
    [key: string]: TaskType[]
}


const initialState: TTasksState = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) tasks.splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const task = state[action.payload.task.todoListId]
            task.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{
            taskId: string
            model: UpdateDomainTaskModelType
            todolistId: string
        }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTask: (state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todos.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksAndTodolists, (state, action) => {
                //пример удобного вывода state в RTK
                console.log(current(state))
                return action.payload.tasks
            })
    },
})
export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

//Thunks

export const setTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    taskAPI.getTask(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(tasksActions.setTask({tasks, todolistId}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    })
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    taskAPI.createTask(todolistId, title).then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            const task = res.data.data.item
            dispatch(tasksActions.addTask({task}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(todolistsActions.setTodolistEntityStatus({entityStatus: 'loading', id: taskId}))
    taskAPI.deleteTask(todolistId, taskId).then(() => {
        dispatch(tasksActions.removeTask({todolistId, taskId}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        dispatch(todolistsActions.setTodolistEntityStatus({entityStatus: 'idle', id: taskId}))
    }).catch(err => {
        handleServerNetworkError(err.message, dispatch)
    })
}

export const updateTaskTC =
    (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
        (dispatch, getState: () => TAppRootState) => {
            const state = getState()
            const task = state.tasks[todolistId].find((t) => t.id === taskId)
            if (!task) {
                //throw new Error("task not found in the state");
                console.warn("task not found in the state")
                return
            }

            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...model,
            }

            taskAPI
                .updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        const action = tasksActions.updateTask({taskId, model, todolistId})
                        dispatch(action)
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}