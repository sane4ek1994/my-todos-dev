import { tasksReducer, tasksThunks, TTasksState } from "./tasks-reducer";

import {
  todoListID1,
  todoListID2,
  todolistsActions,
  todolistsThunks,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TaskStatuses, TodoTaskPriorities } from "common/enums/enums";

let startState: TTasksState;

beforeEach(() => {
  startState = {
    [todoListID1]: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "3",
        title: "ReactJS",
        status: TaskStatuses.New,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "4",
        title: "Rest API",
        status: TaskStatuses.New,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "5",
        title: "GraphQL",
        status: TaskStatuses.New,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
    ],
    [todoListID2]: [
      {
        id: "1",
        title: "Pizzza 🍕",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "2",
        title: "Beer🍺",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "3",
        title: "Game 🎮",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "4",
        title: "Hello!",
        status: TaskStatuses.New,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
      {
        id: "5",
        title: "Hi gay!😁",
        status: TaskStatuses.New,
        description: "",
        todoListId: "",
        order: 0,
        addedDate: "",
        deadline: "",
        startDate: "",
        priority: TodoTaskPriorities.Low,
      },
    ],
  };
});

test("remove task", () => {
  const action = tasksThunks.removeTask.fulfilled(
    {
      todolistId: todoListID1,
      taskId: "3",
    },
    "requestId",
    {
      todolistId: todoListID1,
      taskId: "3",
    }
  );

  const endState: TTasksState = tasksReducer(startState, action);

  expect(endState[todoListID1].length).toBe(4);
  expect(endState[todoListID2].length).toBe(5);
});

test("added new tasks", () => {
  const task = {
    id: "1",
    title: "HTML&CSS",
    status: TaskStatuses.Completed,
    description: "",
    todoListId: todoListID1,
    order: 0,
    addedDate: "",
    deadline: "",
    startDate: "",
    priority: TodoTaskPriorities.Low,
  };

  const action = tasksThunks.addTask.fulfilled({ task }, "requestId", {
    title: "HTML&CSS",
    todolistId: "1",
  });

  const endState: TTasksState = tasksReducer(startState, action);

  expect(endState[todoListID1].length).toBe(6);
  expect(endState[todoListID1][0].title).toBe(task.title);
  expect(endState[todoListID1][0]).toBeDefined();
  expect(endState[todoListID1][5].status).toBe(TaskStatuses.New);
});

test("change task title", () => {
  const newTitleTasks = "Create reducers!!";
  const taskNewTitle = {
    todolistId: todoListID2,
    taskId: "1",
    domainModel: { title: newTitleTasks },
  };

  const action = tasksThunks.updateTask.fulfilled(
    taskNewTitle,
    "requestId",
    taskNewTitle
  );

  const endState: TTasksState = tasksReducer(startState, action);

  expect(endState[todoListID1][0].title).toBe("HTML&CSS");
  expect(startState[todoListID2][0].title).toBe("Pizzza 🍕");
  expect(endState[todoListID2][0].title).toBe(newTitleTasks);
  expect(startState[todoListID2].length).toBe(5);
  expect(endState[todoListID2].length).toBe(5);
});

test("change task isDone", () => {
  const taskNewStatus = {
    todolistId: todoListID2,
    taskId: "1",
    domainModel: { status: TaskStatuses.New },
  };
  const action = tasksThunks.updateTask.fulfilled(
    taskNewStatus,
    "requestId",
    taskNewStatus
  );

  const endState: TTasksState = tasksReducer(startState, action);

  expect(startState[todoListID2]).not.toEqual(endState[todoListID2]);
  expect(endState[todoListID2][0].status).toBe(TaskStatuses.New);
});

const todos = [
  { id: todoListID1, title: "Todo list", addedDate: "", order: 0 },
  { id: todoListID2, title: "Todo list_1", addedDate: "", order: 0 },
];

const action = todolistsThunks.fetchTodolists.fulfilled({ todos }, "requestId");

test("new property array should be added when new todolist is added", () => {
  const todos = {
    id: v1(),
    title: "Todo list",
    filter: "all",
    addedDate: "",
    order: 0,
  };

  const action = todolistsThunks.createTodolist.fulfilled(
    { todo: todos },
    "requestId",
    { title: "Todo list" }
  );

  const endState: TTasksState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todoListID1 && k !== todoListID2);
  if (!newKey) {
    throw new Error("New key should be added!");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("empty array should be added when set todolist", () => {
  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState[todoListID1]).toEqual([]);
  expect(endState[todoListID2]).toEqual([]);
});

test("property array should be added when new todolist is removed", () => {
  const action = todolistsThunks.removeTodolist.fulfilled(
    { todolistId: todoListID2 },
    "requestId",
    { todolistId: todoListID2 }
  );
  const endState: TTasksState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todoListID2]).toBeUndefined();
});

test("task should be added for todos", () => {
  const action = tasksThunks.fetchTask.fulfilled(
    { tasks: startState[todoListID1], todolistId: todoListID1 },
    "requestId",
    todoListID1
  );

  const endState = tasksReducer(
    {
      todoListID1: [],

      todoListID2: [],
    },
    action
  );

  expect(endState[todoListID1].length).toBe(5);
});
