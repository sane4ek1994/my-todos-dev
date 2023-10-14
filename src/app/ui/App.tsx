import { CircularProgress, Container } from "@mui/material";
import { useAppSelector } from "app/store";
import React, { useEffect } from "react";
import { ErrorSnackbar } from "common/componets/ErrorSnackbar/ErrorSnackbar";
import { authThunks } from "features/Login/model/authSlice";
import { useActions } from "common/hooks/useAction";
import { selectIsInitialized } from "app/model/appSelectors";
import { Header } from "app/ui/Header/Header";
import { Routing } from "app/ui/Routing/Routing";

function App() {
  const isInitialized = useAppSelector(selectIsInitialized);
  const { initializeApp } = useActions(authThunks);

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
    <div>
      <ErrorSnackbar />
      <Header />
      <Container fixed>
        <Routing />
      </Container>
    </div>
  );
}

export default App;
