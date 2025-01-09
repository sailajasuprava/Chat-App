import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { setUser } = useAuth();

  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin();
  }

  async function handleLogin() {
    const { username, password } = inputs;

    if (!username || !password) {
      toast.error("Please fill in all the fields!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      localStorage.setItem("chatapp", data.userId);
      setUser(data.userId);
      setInputs({
        username: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { handleSubmit, handleInputs, inputs, isLoading };
}

export default useLogin;
