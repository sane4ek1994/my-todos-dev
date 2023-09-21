import {TodolistDomainType, todoListID1, todolistsActions, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TTasksState} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTaskState: TTasksState = {}
    const startTodolistState: TodolistDomainType[] = []

    const todos = {id: todoListID1, title: 'Todo list', filter: 'all', addedDate: '', order: 0}

    const action = todolistsActions.addTodolist({todolist: todos})

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTask).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)

})