import React, { useCallback, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AddItemForm } from "common/componets/AddItemForm/AddItemForm";
import { EditableSpan } from "common/componets/EditableSpan/EditableSpan";
import { Button, IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useAppSelector } from "app/store";
import { tasksThunks } from "../tasks-reducer";
import {
  TFilterTask,
  TodolistDomainType,
  todolistsActions,
  todolistsThunks,
} from "../todolists-reducer";
import { TaskType } from "common/types/types";
import { Task } from "./Task/Task";
import { TaskStatuses } from "common/enums/enums";
import { useActions } from "common/hooks/useAction";
import { useAppDispatch } from "common/hooks/useAppDispatch";

type TProps = {
  todolist: TodolistDomainType;
};

export const TodoList = React.memo(({ todolist }: TProps) => {
  //берем один тудулист из стейта
  // const todolist = useSelector<TAppRootState, TTodoList>(state => state.todolists.filter(todo => todo.id === categoryId)[0])

  const tasks = useAppSelector<TaskType[]>((state) => state.tasks[todolist.id]);
  const { title, filter } = todolist;

  const dispatch = useAppDispatch();

  const { fetchTask, addTask } = useActions(tasksThunks);
  const { updateTitleTodolist, removeTodolist } = useActions(todolistsThunks);

  const [parent] = useAutoAnimate();

  useEffect(() => {
    fetchTask(todolist.id);
  }, [todolist.id, fetchTask]);

  const updateTodoListTitle = useCallback(
    (newTitle: string) =>
      updateTitleTodolist({
        title: newTitle,
        todolistId: todolist.id,
      }),
    [todolist.id, updateTitleTodolist]
  );

  const addNewTask = useCallback(
    (title: string) => addTask({ todolistId: todolist.id, title }),
    [todolist.id, addTask]
  );
  const changeFiltered = (valueFilter: TFilterTask) =>
    dispatch(
      todolistsActions.changeTodolistFilter({
        id: todolist.id,
        filter: valueFilter,
      })
    );
  const handleRemoveTodolist = () =>
    removeTodolist({ todolistId: todolist.id });
  const filterTaskHandler = () => {
    let filteredTask = tasks;
    switch (filter) {
      case "active":
        return filteredTask?.filter((t) => t.status === TaskStatuses.New);
      case "completed":
        return filteredTask?.filter((t) => t.status === TaskStatuses.Completed);
      default:
        return filteredTask;
    }
  };

  return (
    <div>
      <h2>
        <EditableSpan title={title} onChangeTitle={updateTodoListTitle} />
        <IconButton
          onClick={handleRemoveTodolist}
          disabled={todolist.entityStatus === "loading"}
        >
          <DeleteForever />
        </IconButton>
      </h2>

      <AddItemForm addItem={addNewTask} />
      <ul ref={parent}>
        {filterTaskHandler().map((t) => (
          <Task key={t.id} todolistId={todolist.id} {...t} />
        ))}
      </ul>
      <Button
        onClick={() => changeFiltered("all")}
        variant={filter === "all" ? "contained" : "text"}
      >
        All
      </Button>
      <Button
        color={"secondary"}
        onClick={() => changeFiltered("active")}
        variant={filter === "active" ? "contained" : "text"}
      >
        Active
      </Button>
      <Button
        color={"success"}
        onClick={() => changeFiltered("completed")}
        variant={filter === "completed" ? "contained" : "text"}
      >
        Completed
      </Button>
    </div>
  );
});
