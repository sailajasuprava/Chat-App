import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import ConversationProvider from "./context/ConversationContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ConversationProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ConversationProvider>
    </AuthProvider>
  </StrictMode>
);
