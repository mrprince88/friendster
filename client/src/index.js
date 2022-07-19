import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";

ReactDOM.render(
  <SocketContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </SocketContextProvider>,
  document.getElementById("root")
);
