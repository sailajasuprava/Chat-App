import { useConversation } from "../../context/ConversationContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";

function Right() {
  const { selectedUser } = useConversation();

  if (!selectedUser) return <NoChatSelected />;
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">To:</span>{" "}
          <span className="text-gray-900 font-bold">
            {selectedUser.username}
          </span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
}

export default Right;
