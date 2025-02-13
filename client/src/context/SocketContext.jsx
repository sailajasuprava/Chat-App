import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      const socket = io("http://localhost:8000");
      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("context used outside of  provider");
  }
  return context;
}
