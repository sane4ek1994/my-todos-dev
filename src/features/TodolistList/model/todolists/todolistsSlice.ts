import { v1 } from "uuid";
import { appActions, RequestStatusType } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { todolistAPI } from "features/TodolistList/api/todolists-api";
import { RESULT_CODE } from "common/enums/enums";
import { TodolistsType } from "common/types/types";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunk-try-catch";

export const todoListID1 = v1();
export const todoListID2 = v1();

export type TFilterTask = "all" | "completed" | "active";
export type TodolistDomainType = TodolistsType & {
  filter: TFilterTask;
  entityStatus: RequestStatusType;
};

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: TFilterTask }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    setTodolistEntityStatus: (
      state,
      action: PayloadAction<{ entityStatus: RequestStatusType; id: string }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todos.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todo,
          filter: "all",
          entityStatus: "idle",
        };
        state.unshift(newTodolist);
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === action.payload.todolistId
        );
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(
        todolistsThunks.updateTitleTodolist.fulfilled,
        (state, action) => {
          const todo = state.find(
            (todo) => todo.id === action.payload.todolistId
          );
          if (todo) {
            todo.title = action.payload.title;
          }
        }
      );
  },
});

//Thunks

const fetchTodolists = createAppAsyncThunk<{ todos: TodolistsType[] }>(
  `${slice.name}/getTodolists`,
  async (arg, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const res = await todolistAPI.getTodolist();
      const todos = res.data;

      return { todos };
    });
  }
);

const createTodolist = createAppAsyncThunk<
  { todo: TodolistsType },
  { title: string }
>(`${slice.name}/createTodolist`, async ({ title }, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  return thunkTryCatch(thunkApi, async () => {
    const res = await todolistAPI.createTodolist(title);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      const todo = res.data.data.item;
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      return { todo };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const removeTodolist = createAppAsyncThunk<
  { todolistId: string },
  { todolistId: string }
>(`${slice.name}/removeTodolist`, async ({ todolistId }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistAPI.deleteTodolist(todolistId);
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(
        todolistsActions.setTodolistEntityStatus({
          entityStatus: "idle",
          id: todolistId,
        })
      );
      return { todolistId };
    } else {
      handleServerNetworkError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const updateTitleTodolist = createAppAsyncThunk<
  { title: string; todolistId: string },
  { title: string; todolistId: string }
>(
  `${slice.name}/updateTitleTodolist`,
  async ({ title, todolistId }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistAPI.updateTodolistTitle(title, todolistId);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { title, todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  }
);

export const todolistsSlice = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {
  fetchTodolists,
  createTodolist,
  removeTodolist,
  updateTitleTodolist,
};
