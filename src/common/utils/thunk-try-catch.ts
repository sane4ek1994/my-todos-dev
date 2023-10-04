import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, TAppRootState } from "app/store";
import { BaseResponseType } from "common/types/types";
import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";

/**
 * Утилитарная функция для обработки асинхронной логики в действиях Redux Thunk.
 *
 * @template T - Тип данных, который возвращает асинхронная логика.
 *
 * @param {BaseThunkAPI<TAppRootState, unknown, AppDispatch, null | BaseResponseType>} thunkAPI -
 *   Объект Redux Thunk API, который содержит функции dispatch и rejectWithValue.
 *
 * @param {() => Promise<T>} logic - Функция, которая инкапсулирует асинхронную логику, которую вы хотите выполнить.
 *
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} - Обещание, которое разрешается результатом асинхронной логики в случае успеха
 *   или отклоняется значением, возвращенным thunkAPI.rejectWithValue в случае ошибки.
 *
 * @throws {Error} Выбрасывается, если произошла ошибка во время выполнения асинхронной логики.
 */
export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<
    TAppRootState,
    unknown,
    AppDispatch,
    null | BaseResponseType
  >,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
