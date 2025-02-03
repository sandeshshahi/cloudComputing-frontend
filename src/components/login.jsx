import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email); // Store email for future requests
      navigate("/profile");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center flex-col h-full gap-y-8 mt-10">
      <div className="text-3xl">
        <h2>Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
