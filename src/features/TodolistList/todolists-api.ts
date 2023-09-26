import {instance} from "api/common-api";
import {CreateResponseItemType, TodolistsType, ResponseType} from "common/types/types";

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistsType[]>('/todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<CreateResponseItemType>>('/todo-lists', {title})
    },

    updateTodolistTitle(newTitle: string, todolistId: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: newTitle})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    }

}