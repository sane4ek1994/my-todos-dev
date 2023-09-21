import {
    tasksActions,
    tasksReducer,
    TTasksState,
} from "./tasks-reducer";

import {
    todoListID1,
    todoListID2, todolistsActions,
} from "./todolists-reducer";
import {TaskStatuses, TodoTaskPriorities} from "api/task-api";
import {v1} from "uuid";

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

    const action = tasksActions.removeTask({todolistId: todoListID1, taskId: '3'})

    const endState: TTasksState = tasksReducer(startState, action)

    console.log(endState[todoListID1].length)
    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID2].length).toBe(5)

})


test('added new tasks', () => {

    const newTasks = {
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: '',
        todoListId: todoListID1,
        order: 0,
        addedDate: '',
        deadline: '',
        startDate: '',
        priority: TodoTaskPriorities.Low
    }

    const action = tasksActions.addTask({task: newTasks})

    const endState: TTasksState = tasksReducer(startState, action)

    expect(endState[todoListID1].length).toBe(6)
    expect(endState[todoListID1][0].title).toBe(newTasks.title)
    expect(endState[todoListID1][0]).toBeDefined()
    expect(endState[todoListID1][5].status).toBe(TaskStatuses.New)

})

test('change task title', () => {

    const newTitleTasks = 'Create reducers!!'

    const action = tasksActions.updateTask({todolistId: todoListID2, taskId: '1', model: {title: newTitleTasks}})

    const endState: TTasksState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].title).toBe('HTML&CSS')
    expect(startState[todoListID2][0].title).toBe('Pizzza 🍕')
    expect(endState[todoListID2][0].title).toBe(newTitleTasks)
    expect(startState[todoListID2].length).toBe(5)
    expect(endState[todoListID2].length).toBe(5)

})

test('change task isDone', () => {


    const action = tasksActions.updateTask({todolistId: todoListID2, taskId: '1', model: {status: TaskStatuses.New}})

    const endState: TTasksState = tasksReducer(startState, action)

    expect(startState[todoListID2]).not.toEqual(endState[todoListID2])
    expect(endState[todoListID2][0].status).toBe(TaskStatuses.New)

})

const todos = [
    {id: todoListID1, title: 'Todo list', addedDate: '', order: 0},
    {id: todoListID2, title: 'Todo list_1', addedDate: '', order: 0}
]

const action = todolistsActions.setTodolists({todos})

test('new property array should be added when new todolist is added', () => {

    const todos = {id: v1(), title: 'Todo list', filter: 'all', addedDate: '', order: 0}

    const action = todolistsActions.addTodolist({todolist: todos})

    const endState: TTasksState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todoListID1 && k !== todoListID2)
    if (!newKey) {
        throw new Error('New key should be added!')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('empty array should be added when set todolist', () => {

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState[todoListID1]).toEqual([])
    expect(endState[todoListID2]).toEqual([])
})

test('property array should be added when new todolist is removed', () => {

    const action = todolistsActions.removeTodolist({id: todoListID2})
    const endState: TTasksState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListID2]).toBeUndefined()

})

test('task should be added for todos', () => {

    const action = tasksActions.setTask({tasks: startState[todoListID1], todolistId: todoListID1})

    const endState = tasksReducer({
        todoListID1: [],
        todoListID2: []
    }, action)

    expect(endState[todoListID1].length).toBe(5)

})