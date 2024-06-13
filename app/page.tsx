"use client";

import { useState } from "react";
import { setToken } from "@/redux/auth/auth.slice";
import useAuthSession from "../hooks/useAuthSession";
import { useAppDispatch } from "@/redux/store";
import axios from "axios";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  // Implement the logic to authenticate the user
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await axios.post("/api/login", { username, password });
      console.log(response);
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      alert("Login successful");
      window.location.reload(); // refresh to update user session
    } catch (error: any) {
      alert(
        ("Login failed: " + error && error.response?.data?.message) ||
          error.message
      );
    }
  };

  console.log(user);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {!user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome,</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">
            The hook should be usable like this:{" "}
          </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md"></pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
