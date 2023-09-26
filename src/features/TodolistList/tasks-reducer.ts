import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { appActions } from "app/app-reducer";
import { createSlice, current } from "@reduxjs/toolkit";
import {
  todolistsActions,
  todolistsThunks,
} from "features/TodolistList/todolists-reducer";
import { clearTasksAndTodolists } from "common/common-action";
import { TaskType, UpdateTaskModelType } from "common/types/types";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { taskAPI } from "./task-api";
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
>(`${slice.name}/fetchTask`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await taskAPI.getTask(todolistId);
    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));

    return { tasks, todolistId };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const addTask = createAppAsyncThunk<
  { task: TaskType },
  { todolistId: string; title: string }
>(`${slice.name}/addTask`, async ({ todolistId, title }, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await taskAPI.createTask(todolistId, title);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      const task = res.data.data.item;
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      return { task };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const removeTask = createAppAsyncThunk<
  { todolistId: string; taskId: string },
  { todolistId: string; taskId: string }
>(`${slice.name}/removeTask`, async ({ todolistId, taskId }, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  dispatch(
    todolistsActions.setTodolistEntityStatus({
      entityStatus: "loading",
      id: taskId,
    })
  );
  try {
    const res = await taskAPI.deleteTask(todolistId, taskId);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      return { todolistId, taskId };
    } else {
      dispatch(appActions.setAppStatus({ status: "failed" }));
      dispatch(
        todolistsActions.setTodolistEntityStatus({
          entityStatus: "idle",
          id: taskId,
        })
      );

      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
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

    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await taskAPI.updateTask(todolistId, taskId, apiModel);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));

        return { taskId, domainModel, todolistId };
      } else {
        dispatch(appActions.setAppStatus({ status: "failed" }));
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

// export const updateTaskTC =
//   (
//     taskId: string,
//     model: UpdateDomainTaskModelType,
//     todolistId: string
//   ): AppThunk =>
//   (dispatch, getState: () => TAppRootState) => {
//     const state = getState();
//     const task = state.tasks[todolistId].find((t) => t.taskId === taskId);
//     if (!task) {
//       //throw new Error("task not found in the state");
//       console.warn("task not found in the state");
//       return;
//     }
//
//     const apiModel: UpdateTaskModelType = {
//       deadline: task.deadline,
//       description: task.description,
//       priority: task.priority,
//       startDate: task.startDate,
//       title: task.title,
//       status: task.status,
//       ...model,
//     };
//
//     taskAPI
//       .updateTask(todolistId, taskId, apiModel)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           const action = tasksActions.updateTask({ taskId, model, todolistId });
//           dispatch(action);
//         } else {
//           handleServerAppError(res.data, dispatch);
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch);
//       });
//   };

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
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
