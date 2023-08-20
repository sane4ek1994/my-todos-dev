import {
    addTaskAC,
    changeTaskIsDoneAC,
    changeTaskTitleAC,
    removeTasksAC,
    tasksReducer,
    TTasksState,
} from "./tasks-reducer";

import {
    addTodolistAC,
    removeTodolistAC,
    TAddTodolist,
    todoListID1,
    todoListID2,
    TRemoveTodolist
} from "./todolists-reducer";
import {TaskStatuses, TodoTaskPriorities} from "../api/task-api";

let startState: TTasksState

beforeEach(() => {
    startState = {
        [todoListID1]: [
            {
                id: '1',
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
                id: '2',
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
                id: '3',
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
                id: '4',
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
                id: '5',
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
                id: '1',
                title: 'Pizzza 🍕',
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
                id: '2',
                title: 'Beer🍺',
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
                id: '3',
                title: 'Game 🎮',
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
                id: '4',
                title: 'Hello!',
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
                id: '5',
                title: 'Hi gay!😁',
                status: TaskStatuses.New,
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
})

test('remove task', () => {

    const action = removeTasksAC(todoListID1, '3')

    const endState: TTasksState = tasksReducer(startState, action)

    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID2].length).toBe(5)

})

test('added new tasks', () => {

    const newTitleTasks = 'New Task Reducer'

    const action = addTaskAC(todoListID1, newTitleTasks)

    const endState: TTasksState = tasksReducer(startState, action)

    expect(endState[todoListID1].length).toBe(6)
    expect(endState[todoListID1][0].title).toBe(newTitleTasks)
    expect(endState[todoListID1][0]).toBeDefined()
    expect(endState[todoListID1][5].status).toBe(TaskStatuses.New)

})

test('change task title', () => {

    const newTitleTasks = 'Create reducers!!'

    const action = changeTaskTitleAC(todoListID2, '1', newTitleTasks)

    const endState: TTasksState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].title).toBe('HTML&CSS')
    expect(startState[todoListID2][0].title).toBe('Pizzza 🍕')
    expect(endState[todoListID2][0].title).toBe(newTitleTasks)
    expect(startState[todoListID2].length).toBe(5)
    expect(endState[todoListID2].length).toBe(5)

})

test('change task isDone', () => {


    const action = changeTaskIsDoneAC(todoListID2, '1', TaskStatuses.New)

    const endState: TTasksState = tasksReducer(startState, action)

    expect(startState[todoListID2]).not.toEqual(endState[todoListID2])
    expect(endState[todoListID2][0].status).toBe(TaskStatuses.New)

})

test('new property array should be added when new todolist is added', () => {


    const action: TAddTodolist = addTodolistAC('no matter title and id v1() =>')

    const endState: TTasksState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todoListID1 && k !== todoListID2)
    if (!newKey) {
        throw new Error('New key should be added!')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property array should be added when new todolist is removed', () => {


    const action: TRemoveTodolist = removeTodolistAC(todoListID2)
    const endState: TTasksState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListID2]).toBeUndefined()

})