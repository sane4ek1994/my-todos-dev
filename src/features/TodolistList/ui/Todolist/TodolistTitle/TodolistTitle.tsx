import React from "react";
import { EditableSpan } from "common/componets/EditableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useActions } from "common/hooks/useAction";
import {
  TodolistDomainType,
  todolistsThunks,
} from "features/TodolistList/model/todolists/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { updateTitleTodolist, removeTodolist } = useActions(todolistsThunks);

  const updateTodoListTitle = (newTitle: string) =>
    updateTitleTodolist({ title: newTitle, todolistId: todolist.id });

  const removeTodolistHandler = () =>
    removeTodolist({ todolistId: todolist.id });
  return (
    <h2>
      <EditableSpan
        title={todolist.title}
        onChangeTitle={updateTodoListTitle}
      />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={todolist.entityStatus === "loading"}
      >
        <DeleteForever />
      </IconButton>
    </h2>
  );
};
