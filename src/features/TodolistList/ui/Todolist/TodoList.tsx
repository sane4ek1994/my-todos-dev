import React, { useEffect } from "react";
import { AddItemForm } from "common/componets/AddItemForm/AddItemForm";
import { tasksThunks } from "features/TodolistList/model/tasks/tasksSlice";
import { TodolistDomainType } from "features/TodolistList/model/todolists/todolistsSlice";
import { useActions } from "common/hooks/useAction";
import { FilterTasksButtons } from "features/TodolistList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistList/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
};

export const TodoList = React.memo(({ todolist }: Props) => {
  const { fetchTask, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTask(todolist.id);
  }, [todolist.id, fetchTask]);

  const addTaskCallback = (title: string) =>
    addTask({ todolistId: todolist.id, title }).unwrap();

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
});
