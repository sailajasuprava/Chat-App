import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

// eslint-disable-next-line react/prop-types
function ConversationProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState();
  return (
    <ConversationContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </ConversationContext.Provider>
  );
}

export default ConversationProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useConversation() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("context used outside of  provider");
  }
  return context;
}
