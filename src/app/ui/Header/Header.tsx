import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useAppSelector } from "app/store";
import { selectIsLoggedIn } from "features/Login/model/authSelectors";
import { selectStatus } from "app/model/appSelectors";
import { useActions } from "common/hooks/useAction";
import { authThunks } from "features/Login/model/authSlice";

export const Header = () => {
  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { logout } = useActions(authThunks);
  const logoutHandler = () => {
    logout();
  };
  return (
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
  );
};
