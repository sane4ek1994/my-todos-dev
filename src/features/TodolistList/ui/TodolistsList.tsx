import { useAppSelector } from "app/store";
import {
  TodolistDomainType,
  todolistsThunks,
} from "features/TodolistList/model/todolists/todolistsSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/componets/AddItemForm/AddItemForm";
import { TodoList } from "features/TodolistList/ui/Todolist/TodoList";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectTodolists } from "features/TodolistList/model/todolists/todolistsSelectors";
import { selectIsLoggedIn } from "features/Login/model/authSelectors";

export const TodosListLists = () => {
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);
  const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists);
  const dispatch = useAppDispatch();

  const [parent] = useAutoAnimate();

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.createTodolist({ title }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(todolistsThunks.fetchTodolists());
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{ padding: "10px", marginBottom: "10px" }}
      >
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3} ref={parent} justifyContent="center">
        {todolists?.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper elevation={3} style={{ padding: "10px" }}>
                <TodoList todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
