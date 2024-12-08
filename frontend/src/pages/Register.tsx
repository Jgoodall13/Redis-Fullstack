import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Define the mutation function
  const registerMutation = useMutation({
    mutationFn: async (newUser: { email: string; password: string }) => {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to register");
      }
      return response.json();
    },
    onSuccess: (data) => {
      login(data.accessToken); // Save the token in context/localStorage
      navigate("/dashboard"); // Navigate to dashboard
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = () => {
    const email = emailInput.current?.value || "";
    const password = passwordInput.current?.value || "";

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    registerMutation.mutate({ email, password });
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
          disabled={registerMutation.isLoading}
        >
          {registerMutation.isLoading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}
