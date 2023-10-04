import { TaskStatuses, TodoTaskPriorities } from "common/enums/enums";

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export type FieldErrorType = {
  error: string;
  field: string;
};

//❗ Чтобы у нас не было пересечения имен наовем общий тип BaseResponseType
export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldErrorType[];
};

export type TodolistsType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type CreateResponseItemType = {
  item: TodolistsType;
};

export type LoginDataType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
  captcha?: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TodoTaskPriorities;
  startDate: string;
  deadline: string;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TodoTaskPriorities;
  startDate: string;
  deadline: string;
  addedDate: string;
};

export type GetTaskResponseType = {
  error: string;
  items: TaskType[];
  totalCount: number;
};

export type CreateTaskResponseType = {
  item: TaskType;
};

export type TaskResponseType<T = {}> = {
  data: T;
  fieldsErrors: string[];
  messages: string[];
  resultCode: number;
};
