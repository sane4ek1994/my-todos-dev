import {
  TodolistDomainType,
  todoListID1,
  todolistsActions,
  todolistsReducer,
  todolistsThunks,
} from "./todolists-reducer";
import { tasksReducer, TTasksState } from "./tasks-reducer";

test("ids should be equals", () => {
  const startTaskState: TTasksState = {};
  const startTodolistState: TodolistDomainType[] = [];

  const todos = {
    id: todoListID1,
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

  const endTaskState = tasksReducer(startTaskState, action);
  const endTodolistState = todolistsReducer(startTodolistState, action);

  const keys = Object.keys(endTaskState);
  const idFromTask = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  expect(idFromTask).toBe(action.payload.todo.id);
  expect(idFromTodolists).toBe(action.payload.todo.id);
});
