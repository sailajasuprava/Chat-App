import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/authContext.jsx";
import ConversationProvider from "./context/ConversationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ConversationProvider>
        <App />
      </ConversationProvider>
    </AuthProvider>
  </StrictMode>
);
