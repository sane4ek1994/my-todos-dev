import axios from "axios";

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TodoTaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

type GetTaskResponseType = {
    error: string,
    items: TaskType[]
    totalCount: number
}

type CreateTaskResponseType = {
    item: TaskType
}


type TaskResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}


const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true
})

export const taskAPI = {
    getTask(todolistId: string) {
        return instanse.get<GetTaskResponseType>(`${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instanse.post<TaskResponseType<CreateTaskResponseType>>(`${todolistId}/tasks`, {title})
    },

    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instanse.put<TaskResponseType<CreateTaskResponseType>>(`${todolistId}/tasks/${taskId}`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<TaskResponseType>(`${todolistId}/tasks/${taskId}`)
    }

}