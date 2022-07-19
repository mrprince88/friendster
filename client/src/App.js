import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { SocketConnect } from "./apiCalls";
import { SocketContext } from "./context/SocketContext";
import { useEffect, useState } from "react";
import { CometChat } from "@cometchat-pro/chat";

export default function App() {
  const { user } = useContext(AuthContext);
  const { socket, dispatch } = useContext(SocketContext);

  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(process.env.REACT_APP_CHAT_REGION)
    .build();
  CometChat.init(process.env.REACT_APP_CHAT_APP_ID, appSetting)
    .then(() => {
      console.log("Initialization completed successfully");
    })
    .catch((error) => {
      console.log("Initialization failed with error:", error);
    });

  useEffect(async () => {
    SocketConnect(dispatch);
  }, []);

  return (
    <>
      {socket && (
        <Router>
          <Routes>
            <Route exact path="/" element={user ? <Home /> : <Login />} />
            <Route path="/profile/:userId" element={<Profile />}></Route>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}></Route>
            <Route path="/messenger" element={user ? <Chats /> : <Navigate to="/" />}></Route>
          </Routes>
        </Router>
      )}
    </>
  );
}
