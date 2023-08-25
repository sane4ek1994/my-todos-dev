import axios from "axios";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
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

    updateTask(todolistId: string, taskId: string, model: TaskType) {
        return instanse.put<TaskResponseType<{item: TaskType}>>(`${todolistId}/tasks/${taskId}`, {model})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<TaskResponseType>(`${todolistId}/tasks/${taskId}`)
    }

}