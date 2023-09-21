import {
    TFilterTask,
    TodolistDomainType,
    todoListID1,
    todoListID2, todolistsActions,
    todolistsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "app/app-reducer";

let startState: TodolistDomainType[]

beforeEach(() => {
    startState = [
        {id: todoListID1, title: 'Todo list', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoListID2, title: 'Hobby list', filter: 'active', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
})

test('correct todolist should be removed', () => {


    const endState: TodolistDomainType[] = todolistsReducer(startState, todolistsActions.removeTodolist({id: todoListID1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).not.toBe(todoListID1)
})

test('correct todolist should be added', () => {


    const newTodos = {id: todoListID2, title: 'Hobby list', filter: 'active', addedDate: '', order: 0}

    const endState: TodolistDomainType[] = todolistsReducer(startState, todolistsActions.addTodolist({todolist: newTodos}))

    expect(endState[0].title).toBe(newTodos.title)
    expect(endState.length).not.toBe(2)
})

test('correct title of todolist should be changed', () => {

    const newTitle = 'Im new title'
    const endState: TodolistDomainType[] = todolistsReducer(startState, todolistsActions.changeTodolistTitle({
        id: todoListID1,
        title: newTitle
    }))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('Hobby list')
})

test('should todos be set to state', () => {

    const action = todolistsActions.setTodolists({todos: startState})
    const endState: TodolistDomainType[] = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct filter of todolist should be changed', () => {

    const newFilter: TFilterTask = 'completed'

    const endState = todolistsReducer(startState, todolistsActions.changeTodolistFilter({
        id: todoListID1,
        filter: newFilter
    }))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('active')
})

test('todolist changed entityStatus', () => {
    const newStatus: RequestStatusType = 'loading'

    const endState = todolistsReducer(startState, todolistsActions.setTodolistEntityStatus({
        entityStatus: newStatus,
        id: todoListID1
    }))

    expect(endState[0].entityStatus).toBe(newStatus)
    expect(endState[1].entityStatus).toBe('idle')
})