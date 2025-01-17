import { useEffect } from "react";
import { useConversation } from "../../context/ConversationContext";

/* eslint-disable react/prop-types */
function Conversation({ user }) {
  const { selectedUser, setSelectedUser } = useConversation();

  useEffect(() => {
    return () => setSelectedUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { username, profilePic, _id } = user;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          selectedUser?._id === _id ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedUser(user)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={profilePic} alt={username} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{username}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
}

export default Conversation;
