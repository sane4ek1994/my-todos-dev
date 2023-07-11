import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskIsDoneAC,
    changeTaskTitleAC,
    removeTasksAC,
    tasksReducer,
    TTasksState,
} from "./tasks-reducer";


test('remove task', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const startState: TTasksState = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Pizzza 🍕", isDone: true},
            {id: '2', title: "Beer🍺", isDone: true},
            {id: '3', title: "Game 🎮", isDone: false},
            {id: '4', title: "Hello!", isDone: false},
            {id: '5', title: "Hi gay!😁", isDone: false},
        ]
    }

    const endState: TTasksState = tasksReducer(startState, removeTasksAC(todoListID1, '2'))

    expect(endState[todoListID1].length).toBe(4)

})

test('added new tasks', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const newTitleTasks = 'New Task Reducer'

    const startState: TTasksState = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Pizzza 🍕", isDone: true},
            {id: '2', title: "Beer🍺", isDone: true},
            {id: '3', title: "Game 🎮", isDone: false},
            {id: '4', title: "Hello!", isDone: false},
            {id: '5', title: "Hi gay!😁", isDone: false},
        ]
    }

    const endState: TTasksState = tasksReducer(startState, addTaskAC(todoListID1, '6', newTitleTasks))

    expect(endState[todoListID1].length).toBe(6)
    expect(endState[todoListID1][0].title).toBe(newTitleTasks)

})

test('change task title', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const newTitleTasks = 'Create reducers!!'

    const startState: TTasksState = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Pizzza 🍕", isDone: true},
            {id: '2', title: "Beer🍺", isDone: true},
            {id: '3', title: "Game 🎮", isDone: false},
            {id: '4', title: "Hello!", isDone: false},
            {id: '5', title: "Hi gay!😁", isDone: false},
        ]
    }

    const endState: TTasksState = tasksReducer(startState, changeTaskTitleAC(todoListID2, '1', newTitleTasks))

    expect(startState[todoListID2][0].title).toBe("Pizzza 🍕")
    expect(endState[todoListID2][0].title).toBe(newTitleTasks)
    expect(startState[todoListID2].length).toBe(5)
    expect(endState[todoListID2].length).toBe(5)

})

test('change task isDone', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const newIsDoneValue = false

    const startState: TTasksState = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: '1', title: "Pizzza 🍕", isDone: true},
            {id: '2', title: "Beer🍺", isDone: true},
            {id: '3', title: "Game 🎮", isDone: false},
            {id: '4', title: "Hello!", isDone: false},
            {id: '5', title: "Hi gay!😁", isDone: false},
        ]
    }

    const endState: TTasksState = tasksReducer(startState, changeTaskIsDoneAC(todoListID2, '1', newIsDoneValue))

    expect(startState[todoListID2]).not.toEqual(endState[todoListID2])
    expect(endState[todoListID2][0].isDone).toBe(false)

})