import { appActions } from "app/model/appSlice";
import { createSlice, current } from "@reduxjs/toolkit";
import { todolistsThunks } from "features/TodolistList/model/todolists/todolistsSlice";
import { clearTasksAndTodolists } from "common/common-action";
import { TaskType, UpdateTaskModelType } from "common/types/types";
import { taskAPI } from "features/TodolistList/api/task-api";
import {
  RESULT_CODE,
  TaskStatuses,
  TodoTaskPriorities,
} from "common/enums/enums";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";

export type TTasksState = {
  [key: string]: TaskType[];
};

const initialState: TTasksState = {};

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todo.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todos.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, (state, action) => {
        //пример удобного вывода state в RTK
        console.log(current(state));
        return action.payload.tasks;
      })
      .addCase(tasksThunks.fetchTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(tasksThunks.addTask.fulfilled, (state, action) => {
        const task = state[action.payload.task.todoListId];
        task.unshift(action.payload.task);
      })
      .addCase(tasksThunks.removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(tasksThunks.updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      });
  },
});

//Thunks

const fetchTask = createAppAsyncThunk<
  {
    tasks: TaskType[];
    todolistId: string;
  },
  string
>(`${slice.name}/fetchTask`, async (todolistId) => {
  const res = await taskAPI.getTask(todolistId);
  const tasks = res.data.items;

  return { tasks, todolistId };
});

const addTask = createAppAsyncThunk<
  { task: TaskType },
  { todolistId: string; title: string }
>(
  `${slice.name}/addTask`,
  async ({ todolistId, title }, { rejectWithValue }) => {
    const res = await taskAPI.createTask(todolistId, title);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      const task = res.data.data.item;

      return { task };
    } else {
      return rejectWithValue(res.data);
    }
  }
);

const removeTask = createAppAsyncThunk<
  { todolistId: string; taskId: string },
  { todolistId: string; taskId: string }
>(`${slice.name}/removeTask`, async ({ todolistId, taskId }, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const res = await taskAPI.deleteTask(todolistId, taskId);
  if (res.data.resultCode === RESULT_CODE.SUCCESS) {
    return { todolistId, taskId };
  }
  return rejectWithValue(null);
});

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  `${slice.name}/updateTask`,
  async ({ taskId, domainModel, todolistId }, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      dispatch(appActions.setAppError({ error: "Task not found" }));
      return rejectWithValue(null);
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    const res = await taskAPI.updateTask(todolistId, taskId, apiModel);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      return { taskId, domainModel, todolistId };
    } else {
      return rejectWithValue(res.data);
    }
  }
);

export const tasksSlice = slice.reducer;
export const tasksThunks = { fetchTask, addTask, removeTask, updateTask };

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TodoTaskPriorities;
  startDate?: string;
  deadline?: string;
};

type UpdateTaskArgType = {
  todolistId: string;
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
};
