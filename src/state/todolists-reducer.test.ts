import {TFilterTask, TTodoList} from '../App'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, todoListID1, todoListID2,
    todolistsReducer
} from "./todolists-reducer";

let startState: TTodoList[]

beforeEach(() => {
    startState = [
        {id: todoListID1, title: 'Todo list', filter: 'all'},
        {id: todoListID2, title: 'Hobby list', filter: 'active'},
    ]
})

test('correct todolist should be removed', () => {


    const endState: TTodoList[] = todolistsReducer(startState, removeTodolistAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).not.toBe(todoListID1)
})

test('correct todolist should be added', () => {

    const newTitle = 'React & Redux'

    const endState: TTodoList[] = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState.length).not.toBe(2)
})

test('correct title of todolist should be changed', () => {

    const newTitle = 'Im new title'
    const endState: TTodoList[] = todolistsReducer(startState, changeTodolistTitleAC(todoListID1, newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('Hobby list')
})

test('correct filter of todolist should be changed', () => {

    const newFilter: TFilterTask = 'completed'


    const endState = todolistsReducer(startState, changeTodolistFilterAC(todoListID1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('active')
})