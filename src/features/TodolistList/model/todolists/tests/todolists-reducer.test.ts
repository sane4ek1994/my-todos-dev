import {
  TFilterTask,
  TodolistDomainType,
  todoListID1,
  todoListID2,
  todolistsActions,
  todolistsSlice,
  todolistsThunks,
} from "features/TodolistList/model/todolists/todolistsSlice";
import { RequestStatusType } from "app/appSlice";

let startState: TodolistDomainType[];

beforeEach(() => {
  startState = [
    {
      id: todoListID1,
      title: "Todo list",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todoListID2,
      title: "Hobby list",
      filter: "active",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ];
});

test("correct todolist should be removed", () => {
  const endState: TodolistDomainType[] = todolistsSlice(
    startState,
    todolistsThunks.removeTodolist.fulfilled(
      { todolistId: todoListID1 },
      "requestId",
      { todolistId: todoListID1 }
    )
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).not.toBe(todoListID1);
});

test("correct todolist should be added", () => {
  const newTodos = {
    id: todoListID2,
    title: "Hobby list",
    filter: "active",
    addedDate: "",
    order: 0,
  };

  const endState: TodolistDomainType[] = todolistsSlice(
    startState,
    todolistsThunks.createTodolist.fulfilled({ todo: newTodos }, "requestId", {
      title: "Hobby list",
    })
  );

  expect(endState[0].title).toBe(newTodos.title);
  expect(endState.length).not.toBe(2);
});

test("correct title of todolist should be changed", () => {
  const newTitle = "Im new title";
  const endState: TodolistDomainType[] = todolistsSlice(
    startState,
    todolistsThunks.updateTitleTodolist.fulfilled(
      {
        todolistId: todoListID1,
        title: newTitle,
      },
      "requestId",
      {
        todolistId: todoListID1,
        title: newTitle,
      }
    )
  );

  expect(endState[0].title).toBe(newTitle);
  expect(endState[1].title).toBe("Hobby list");
});

test("should todos be set to state", () => {
  const action = todolistsThunks.fetchTodolists.fulfilled(
    { todos: startState },
    "reuestId"
  );
  const endState: TodolistDomainType[] = todolistsSlice([], action);

  expect(endState.length).toBe(2);
});

test("correct filter of todolist should be changed", () => {
  const newFilter: TFilterTask = "completed";

  const endState = todolistsSlice(
    startState,
    todolistsActions.changeTodolistFilter({
      id: todoListID1,
      filter: newFilter,
    })
  );

  expect(endState[0].filter).toBe(newFilter);
  expect(endState[1].filter).toBe("active");
});

test("todolist changed entityStatus", () => {
  const newStatus: RequestStatusType = "loading";

  const endState = todolistsSlice(
    startState,
    todolistsActions.setTodolistEntityStatus({
      entityStatus: newStatus,
      id: todoListID1,
    })
  );

  expect(endState[0].entityStatus).toBe(newStatus);
  expect(endState[1].entityStatus).toBe("idle");
});
