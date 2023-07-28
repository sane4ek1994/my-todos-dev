import {TFilterTask, TTodoList} from "../App";
import {v1} from "uuid";

export type TRemoveTodolist = ReturnType<typeof removeTodolistAC>
export type TAddTodolist = ReturnType<typeof addTodolistAC>
type TChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
type TChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>
type TActions = TRemoveTodolist | TAddTodolist | TChangeTodolistTitle | TChangeTodolistFilter

export const todoListID1 = v1()
export const todoListID2 = v1()

const initialState: TTodoList[] = [
    {id: todoListID1, title: 'Todo list', filter: 'all'},
    {id: todoListID2, title: 'Hobby list', filter: 'active'},
]

export const todolistsReducer = (state: TTodoList[] = initialState, action: TActions): TTodoList[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
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