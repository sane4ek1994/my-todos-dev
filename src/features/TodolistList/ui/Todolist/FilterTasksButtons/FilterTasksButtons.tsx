import React from "react";
import { Button } from "@mui/material";
import {
  TFilterTask,
  TodolistDomainType,
  todolistsActions,
} from "features/TodolistList/model/todolists/todolistsSlice";
import { useActions } from "common/hooks/useAction";

type Props = {
  todolist: TodolistDomainType;
};
export const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeFiltered = (valueFilter: TFilterTask) =>
    changeTodolistFilter({ id: todolist.id, filter: valueFilter });

  return (
    <>
      <Button
        onClick={() => changeFiltered("all")}
        variant={todolist.filter === "all" ? "contained" : "text"}
      >
        All
      </Button>
      <Button
        color={"secondary"}
        onClick={() => changeFiltered("active")}
        variant={todolist.filter === "active" ? "contained" : "text"}
      >
        Active
      </Button>
      <Button
        color={"success"}
        onClick={() => changeFiltered("completed")}
        variant={todolist.filter === "completed" ? "contained" : "text"}
      >
        Completed
      </Button>
    </>
  );
};
