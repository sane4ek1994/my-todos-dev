import {TAddTodolist, TRemoveTodolist, TSetTodolist} from './todolists-reducer'
import {taskAPI, TaskStatuses, TaskType} from "../api/task-api";
import {Dispatch} from "redux";
import {TAppRootState} from "./store";

type TRemoveTask = ReturnType<typeof removeTasksAC>
type TAddTask = ReturnType<typeof addTaskAC>
type TChangeTitleTask = ReturnType<typeof changeTaskTitleAC>
type TChangeIsDoneTask = ReturnType<typeof changeTaskIsDoneAC>
type TSetTasks = ReturnType<typeof setTasksAC>
export type TTasksState = {
    [key: string]: TaskType[]
}

type TActions =
    TRemoveTask
    | TAddTask
    | TChangeTitleTask
    | TChangeIsDoneTask
    | TAddTodolist
    | TRemoveTodolist
    | TSetTodolist
    | TSetTasks

const initialState: TTasksState = {}
export const tasksReducer = (state: TTasksState = initialState, action: TActions): TTasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(list =>
                    list.id === action.id
                        ? {
                            ...list,
                            title: action.title
                        }
                        : list
                )
            }
        case 'CHANGE-TASK-IS-DONE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(list =>
                    list.id === action.categoryId
                        ? {
                            ...list,
                            status: action.status
                        }
                        : list
                )
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            //   const stateCopy = { ...state }
            //   delete stateCopy[action.id]
            //   return stateCopy

            // оптимизация этого кейса
            return Object.fromEntries(Object.entries(state).filter(([key]) => key !== action.id))
        // ещё один крутой подход удоления массива из todolist , но deploy с ним не проходит
        // const {[action.id]: [], ...rest} = state
        // return rest
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todos.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        default:
            return state
    }
}

export const removeTasksAC = (todolistId: string, id: string) => ({type: 'REMOVE-TASK', todolistId, id} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    id,
    title
} as const)

export const changeTaskIsDoneAC = (todolistId: string, categoryId: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-IS-DONE',
    todolistId,
    categoryId,
    status
} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)

//Thunks

export const setTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.getTask(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todolistId))
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistId, title).then(res => {
        const task = res.data.data.item
        dispatch(addTaskAC(task))
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTasksAC(todolistId, taskId))
    })
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => TAppRootState) => {

    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (task) {
        taskAPI.updateTask(todolistId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            order: task.order,
            addedDate: task.addedDate,
            id: task.id,
            todoListId: task.todoListId,
            status
        }).then(() => {
            dispatch(changeTaskIsDoneAC(todolistId, taskId, status))
        })
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => TAppRootState) => {

    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (task) {
        taskAPI.updateTask(todolistId, taskId, {
            title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            order: task.order,
            addedDate: task.addedDate,
            id: task.id,
            todoListId: task.todoListId,
            status: task.status
        }).then(() => {
            dispatch(changeTaskTitleAC(todolistId, taskId, title))
        })
    }
}
