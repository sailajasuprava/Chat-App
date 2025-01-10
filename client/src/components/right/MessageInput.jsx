import { useState } from "react";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";
import { useConversation } from "../../context/ConversationContext";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { selectedUser, setMessages } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    sendMessage(message);
  };

  async function sendMessage() {
    try {
      const res = await fetch(`/api/messages/${selectedUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message);
      }
      setMessage("");
      setMessages((prev) => [...prev, data.data]);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
