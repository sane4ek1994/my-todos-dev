import { instance } from "api/common-api";
import {
  CreateTaskResponseType,
  GetTaskResponseType,
  TaskResponseType,
  TaskType,
  UpdateTaskModelType,
} from "common/types/types";

export const taskAPI = {
  getTask(todolistId: string) {
    return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`);
  },

  createTask(todolistId: string, title: string) {
    return instance.post<TaskResponseType<CreateTaskResponseType>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<TaskResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<TaskResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
};
