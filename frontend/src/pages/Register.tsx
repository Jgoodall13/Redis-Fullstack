import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function Register() {
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const email = emailInput.current?.value || "";
    const password = passwordInput.current?.value || "";

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.accessToken);
        navigate("/dashboard");
      } else {
        console.error("Registration failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl text-cyan-500">React App</h1>
      <h2 className="text-2xl text-cyan-500">Register</h2>
      <div className="flex flex-col">
        <input
          ref={emailInput}
          type="text"
          placeholder="Email"
          className="border border-gray-300 my-2 p-1"
        />
        <input
          ref={passwordInput}
          type="password"
          placeholder="Password"
          className="border border-gray-300 my-2 p-1"
        />
        <button
          onClick={handleSubmit}
          className="bg-cyan-500 text-white p-1 hover:bg-cyan-800"
        >
          Register
        </button>
      </div>
    </div>
  );
}
