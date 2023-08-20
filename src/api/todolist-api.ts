import axios from "axios";

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateResponseItemType = {
    item: TodolistsType
}


const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const todolistAPI = {
    getTodolist() {
        return instanse.get<ResponseType<TodolistsType>>('/todo-lists')
    },

    createTodolist(title: string) {
        return instanse.post<ResponseType<CreateResponseItemType>>('/todo-lists', {title})
    },

    updateTodolistTitle(newTitle: string, todolistId: string) {
        return instanse.put<ResponseType>(`/todo-lists/${todolistId}`, {title: newTitle})
    },

    deleteTodolist(todolistId: string) {
        return instanse.delete<ResponseType>(`/todo-lists/${todolistId}`)
    }

}