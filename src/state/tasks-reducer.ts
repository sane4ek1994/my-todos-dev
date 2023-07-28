import {TTasks} from '../componets/TodoList'
import {v1} from 'uuid'
import {TAddTodolist, todoListID1, todoListID2, TRemoveTodolist} from './todolists-reducer'

type TRemoveTask = ReturnType<typeof removeTasksAC>
type TAddTask = ReturnType<typeof addTaskAC>
type TChangeTitleTask = ReturnType<typeof changeTaskTitleAC>
type TChangeIsDoneTask = ReturnType<typeof changeTaskIsDoneAC>
export type TTasksState = {
    [key: string]: TTasks[]
}

type TActions = TRemoveTask | TAddTask | TChangeTitleTask | TChangeIsDoneTask | TAddTodolist | TRemoveTodolist

const initialState: TTasksState = {
    [todoListID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ],
    [todoListID2]: [
        {id: v1(), title: 'Pizzza 🍕', isDone: true},
        {id: v1(), title: 'Beer🍺', isDone: true},
        {id: v1(), title: 'Game 🎮', isDone: false},
        {id: v1(), title: 'Hello!', isDone: false},
        {id: v1(), title: 'Hi gay!😁', isDone: false}
    ]
}
export const tasksReducer = (state: TTasksState = initialState, action: TActions): TTasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
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
        case 'CHANGE-TASK-ISDONE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(list =>
                    list.id === action.categoryId
                        ? {
                            ...list,
                            isDone: action.isDone
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

export const changeTaskIsDoneAC = (todolistId: string, categoryId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-ISDONE',
    todolistId,
    categoryId,
    isDone
} as const)
