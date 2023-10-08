import { instance } from "api/common-api";
import {
  CreateResponseItemType,
  TodolistsType,
  BaseResponseType,
} from "common/types/types";

export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistsType[]>("/todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<BaseResponseType<CreateResponseItemType>>(
      "/todo-lists",
      { title }
    );
  },

  updateTodolistTitle(newTitle: string, todolistId: string) {
    return instance.put<BaseResponseType>(`/todo-lists/${todolistId}`, {
      title: newTitle,
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`);
  },
};
