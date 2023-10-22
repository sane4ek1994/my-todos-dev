import React from "react";
import { Task } from "features/TodolistList/ui/Todolist/Tasks/Task/Task";
import { TaskStatuses } from "common/enums/enums";
import { TodolistDomainType } from "features/TodolistList/model/todolists/todolistsSlice";
import { TTasksState } from "features/TodolistList/model/tasks/tasksSlice";
import { useAppSelector } from "app/store";
import { selectTasks } from "features/TodolistList/model/tasks/tasksSelectors";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import s from "./tasks.module.css";

type Props = {
  todolist: TodolistDomainType;
};
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector<TTasksState>(selectTasks);

  const [parent] = useAutoAnimate();
  const filterTaskHandler = () => {
    let filteredTask = tasks[todolist.id];
    switch (todolist.filter) {
      case "active":
        return filteredTask?.filter((t) => t.status === TaskStatuses.New);
      case "completed":
        return filteredTask?.filter((t) => t.status === TaskStatuses.Completed);
      default:
        return filteredTask;
    }
  };

  return (
    <ul ref={parent}>
      {filterTaskHandler()?.length === 0 ? (
        <span className={s.taskText}>Create task...</span>
      ) : (
        filterTaskHandler().map((t) => (
          <Task key={t.id} todolistId={todolist.id} {...t} />
        ))
      )}
    </ul>
  );
};
