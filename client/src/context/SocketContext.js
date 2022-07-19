import { createContext, useReducer } from "react";
import SocketReducer from "./SocketReducer";

const INITIAL_STATE = {
  socket: null,
  isFetching: false,
  error: false,
};

export const SocketContext = createContext(INITIAL_STATE);

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, INITIAL_STATE);

  return (
    <SocketContext.Provider
      value={{
        socket: state.socket,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
