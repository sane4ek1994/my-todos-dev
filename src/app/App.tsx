import S from "./App.module.css";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useAppSelector } from "app/store";
import React, { useEffect } from "react";
import { ErrorSnackbar } from "common/componets/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/Login/Login";
import { TodosListLists } from "features/TodolistList/TodolistsList";
import { authThunks } from "features/Login/auth-reducer";
import { useActions } from "common/hooks/useAction";

function App() {
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const isInitialized = useAppSelector<boolean>(
    (state) => state.app.isInitialized
  );
  const status = useAppSelector((state) => state.app.status);
  const { logout, initializeApp } = useActions(authThunks);

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={S.App}>
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo-list
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodosListLists />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"*"} element={<Navigate to={"/404"} />} />
          <Route path={"/404"} element={<h1>404: Page not found...</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
