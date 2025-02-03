import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(user);
      if (response && response.data) {
        alert("Signup successful. Please login.");
        navigate("/login");
      } else {
        alert("Signup failed: No data returned");
      }
    } catch (error) {
      alert(error.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center flex-col h-full gap-y-8 mt-10">
      <div className="text-3xl">
        <h1>Sign Up</h1>
      </div>
      <form
        className="flex items-center justify-center flex-col gap-y-8"
        onSubmit={handleSubmit}
      >
        <input
          className="border-1 rounded-md h-10 w-64 p-3 placeholder:text-xl"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="border-1 rounded-md h-10 w-64 p-3 placeholder:text-xl"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="border-1 rounded-md h-10 w-64 p-3 placeholder:text-xl"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button
          className="h-10 w-64 bg-blue-500 rounded-md text-white hover:cursor-pointer hover:bg-blue-700"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
