import ConversationInput from "./ConversationInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

function Left() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <ConversationInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
}

export default Left;
