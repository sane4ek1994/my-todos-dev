import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodosListLists } from "features/TodolistList/ui/TodolistsList";
import { Login } from "features/Login/ui/Login";

export const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<TodosListLists />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"*"} element={<Navigate to={"/404"} />} />
      <Route path={"/404"} element={<h1>404: Page not found...</h1>} />
    </Routes>
  );
};
