import { createContext, useEffect, useContext } from "react";
import webSocketService from "../utils/websocketService";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  useEffect(() => {
    webSocketService.enableReconnection();
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={webSocketService}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
