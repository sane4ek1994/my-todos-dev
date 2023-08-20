import {v1} from 'uuid'
import {TAddTodolist, todoListID1, todoListID2, TRemoveTodolist} from './todolists-reducer'
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../api/task-api";

type TRemoveTask = ReturnType<typeof removeTasksAC>
type TAddTask = ReturnType<typeof addTaskAC>
type TChangeTitleTask = ReturnType<typeof changeTaskTitleAC>
type TChangeIsDoneTask = ReturnType<typeof changeTaskIsDoneAC>
export type TTasksState = {
    [key: string]: TaskType[]
}

type TActions = TRemoveTask | TAddTask | TChangeTitleTask | TChangeIsDoneTask | TAddTodolist | TRemoveTodolist

const initialState: TTasksState = {
    [todoListID1]: [
        {
            id: v1(),
            title: 'HTML&CSS',
            status: TaskStatuses.Completed,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(),
            title: 'JS',
            status: TaskStatuses.Completed,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(),
            title: 'ReactJS',
            status: TaskStatuses.New,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(),
            title: 'Rest API',
            status: TaskStatuses.New,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(),
            title: 'GraphQL',
            status: TaskStatuses.New,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        }
    ],
    [todoListID2]: [
        {
            id: v1(), title: 'Pizzza 🍕', status: TaskStatuses.Completed,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(), title: 'Beer🍺', status: TaskStatuses.Completed,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(), title: 'Game 🎮', status: TaskStatuses.Completed,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(), title: 'Hello!', status: TaskStatuses.New,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        },
        {
            id: v1(), title: 'Hi gay!😁', status: TaskStatuses.New,
            description: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            priority: TodoTaskPriorities.Low
        }
    ]
}
export const tasksReducer = (state: TTasksState = initialState, action: TActions): TTasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.Completed,
                    description: '',
                    todoListId: action.todolistId,
                    order: 0,
                    addedDate: '',
                    deadline: '',
                    startDate: '',
                    priority: TodoTaskPriorities.Low
                }, ...state[action.todolistId]]
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
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            //   const stateCopy = { ...state }
            //   delete stateCopy[action.id]
            //   return stateCopy

            // оптимизация этого кейса
            return Object.fromEntries(Object.entries(state).filter(([key]) => key !== action.id))
        // ещё один крутой подход удоления массива из todolist , но deploy с ним не проходит
        // const {[action.id]: [], ...rest} = state
        // return rest

        default:
            return state
    }
}

export const removeTasksAC = (todolistId: string, id: string) => ({type: 'REMOVE-TASK', todolistId, id} as const)

export const addTaskAC = (todolistId: string, title: string) => ({type: 'ADD-TASK', todolistId, title} as const)

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
