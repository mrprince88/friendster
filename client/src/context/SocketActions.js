export const SocketConnectStart = () => ({
  type: "SOCKET_CONNECT_START",
});

export const SocketConnectSuccess = (socket) => ({
  type: "SOCKET_CONNECT_SUCCESS",
  payload: socket,
});

export const SocketConnectFailure = () => ({
  type: "SOCKET_CONNECT_FAILURE",
});

export const SocketDisconnect = () => ({
  type: "SOCKET_DISCONNECT",
});
