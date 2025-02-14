import { useEffect } from "react";
import toast from "react-hot-toast";
import Message from "./Message";
import { useConversation } from "../../context/ConversationContext";
import { useSocket } from "../../context/SocketContext";

function Messages() {
  const { selectedUser, messages, setMessages } = useConversation();
  const { socket } = useSocket();
  console.log(messages);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`/api/messages/${selectedUser._id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setMessages(data.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  useEffect(() => {
    socket.on("send-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [socket, setMessages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((msg, i) => (
        <Message key={i} msg={msg} />
      ))}
    </div>
  );
}

export default Messages;
