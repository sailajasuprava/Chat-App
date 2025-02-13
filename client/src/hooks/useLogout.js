import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  async function handleLogout() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      localStorage.removeItem("chatapp");
      setAuth(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, handleLogout };
}

export default useLogout;
