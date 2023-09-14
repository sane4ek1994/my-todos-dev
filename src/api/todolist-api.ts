import axios, {AxiosResponse} from "axios";

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

export type LoginDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const authAPI = {
    login(loginData: LoginDataType) {
        return instanse.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{
            userId: number
        }>>, LoginDataType>
        ('auth/login', loginData)
    },
    logout() {
        return instanse.delete<ResponseType>('auth/login')
    },
    me() {
        return instanse.get('auth/me')
    }
}

export const todolistAPI = {
    getTodolist() {
        return instanse.get<TodolistsType[]>('/todo-lists')
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