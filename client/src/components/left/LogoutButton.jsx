import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { isLoading, handleLogout } = useLogout();

  return (
    <div className="mt-auto" onClick={handleLogout}>
      {!isLoading ? (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
