import { useState } from "react";
import toast from "react-hot-toast";

function useSignUp() {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    passwordConfirm: "",
    gender: "female",
  });

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
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error("Failed to sign up user");
      }
      toast.success(data.message);
      setInputs({
        fullname: "",
        username: "",
        password: "",
        passwordConfirm: "",
        gender: "female",
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return { handleSubmit, handleInputs, inputs };
}

export default useSignUp;
