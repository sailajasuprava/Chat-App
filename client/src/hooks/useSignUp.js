import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    passwordConfirm: "",
    gender: "",
  });
  const { setAuth } = useAuth();

  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSignUp();
  }

  async function handleSignUp() {
    const { fullname, username, password, passwordConfirm, gender } = inputs;

    if (!fullname || !username || !password || !passwordConfirm || !gender) {
      toast.error("Please fill in all the fields!");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be of atleast 8 characters!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
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
      setAuth(data.userId);
      setInputs({
        fullname: "",
        username: "",
        password: "",
        passwordConfirm: "",
        gender: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { handleSubmit, handleInputs, inputs, isLoading };
}

export default useSignUp;
