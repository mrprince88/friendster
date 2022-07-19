import axios from "axios";
import { io } from "socket.io-client";

export const LoginCall = async (userCredential, dispatch, setIsError) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
    setIsError(false);
  } catch (err) {
    console.log("Error", err);
    setIsError(true);
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const LogOut = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.clear();
  window.location.href = "/";
};

export const SocketConnect = async (dispatch) => {
  dispatch({ type: "SOCKET_CONNECT_START" });
  const socket = await io.connect("http://localhost:5000");
  try {
    dispatch({
      type: "SOCKET_CONNECT_SUCCESS",
      payload: socket,
    });
  } catch (err) {
    console.log("Error", err);
    dispatch({ type: "SOCKET_CONNECT_FAILURE" });
  }
};
