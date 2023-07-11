import {v1} from "uuid";
import {TFilterTask, TTodoList} from '../../App'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: TTodoList[] = [
        {id: todoListID1, title: 'Todo list', filter: 'all'},
        {id: todoListID2, title: 'Hobby list', filter: 'active'},
    ]

    const endState: TTodoList[] = todolistsReducer(startState, removeTodolistAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).not.toBe(todoListID1)
})

test('correct todolist should be added', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const newTitle = 'React & Redux'

    const startState: TTodoList[] = [
        {id: todoListID1, title: 'Todo list', filter: 'all'},
        {id: todoListID2, title: 'Hobby list', filter: 'active'},
    ]

    const endState: TTodoList[] = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState.length).not.toBe(2)
})

test('correct title of todolist should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const newTitle = 'Im new title'

    const startState: TTodoList[] = [
        {id: todoListID1, title: 'Todo list', filter: 'all'},
        {id: todoListID2, title: 'Hobby list', filter: 'active'},
    ]


    const endState: TTodoList[] = todolistsReducer(startState, changeTodolistTitleAC(todoListID1, newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('Hobby list')
})

test('correct filter of todolist should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const newFilter: TFilterTask = 'completed'

    const startState: TTodoList[] = [
        {id: todoListID1, title: 'Todo list', filter: 'all'},
        {id: todoListID2, title: 'Hobby list', filter: 'active'},
    ]


    const endState = todolistsReducer(startState, changeTodolistFilterAC(todoListID1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('active')
})