import { useAuth } from "../../context/AuthContext";
import { useConversation } from "../../context/ConversationContext";
import { extractTime } from "../../utils/extractTime";

function Message({ msg }) {
  const { auth } = useAuth();
  const { selectedUser } = useConversation();
  const formattedTime = extractTime(msg.createdAt);
  const isFromMe = auth._id === msg.senderId;
  const chatClassName = isFromMe ? "chat-end" : "chat-start";
  const profilePic = isFromMe ? auth.profilePic : selectedUser?.profilePic;
  const bubbleBgColor = isFromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {msg.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;
