import React from "react";
import {
  AppBar,
  Button,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todos
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
