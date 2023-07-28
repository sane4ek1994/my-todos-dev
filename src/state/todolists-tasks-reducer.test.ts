import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TTasksState} from "./tasks-reducer";
import {TTodoList} from "../App";

test('ids should be equals', () => {
    const startTaskState: TTasksState = {}
    const startTodolistState: TTodoList[] = []

    const action = addTodolistAC('New todolist')

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTask).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)

})