import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProviderWrapper } from "./contexts/ThemeContext.jsx";
import { WebSocketProvider } from "./contexts/WebSocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <WebSocketProvider>
        <AuthProvider>
          <CssBaseline />
          <App />
        </AuthProvider>
      </WebSocketProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
