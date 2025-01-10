import { useEffect } from "react";
import toast from "react-hot-toast";
import Message from "./Message";
import { useConversation } from "../../context/ConversationContext";

function Messages() {
  const { selectedUser } = useConversation();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`/api/messages/${selectedUser._id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        console.log(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchMessages();
  }, [selectedUser]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default Messages;
