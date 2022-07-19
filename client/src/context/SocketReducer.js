const SocketReducer = (state, action) => {
  switch (action.type) {
    case "SOCKET_CONNECT_START":
      return {
        socket: null,
        isFetching: true,
        error: false,
      };
    case "SOCKET_CONNECT_SUCCESS":
      return {
        socket: action.payload,
        isFetching: false,
        error: false,
      };
    case "SOCKET_CONNECT_FAILURE":
      return {
        socket: null,
        isFetching: false,
        error: true,
      };
    case "SOCKET_DISCONNECT":
      return {
        user: null,
        isFetching: null,
        error: null,
      };
    default:
      return state;
  }
};

export default SocketReducer;
