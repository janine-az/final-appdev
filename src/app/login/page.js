"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin@admin.com" && password === "admin123") {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin", email })
      );
      alert("Admin login successful");
      router.push("/dashboard");
      return;
    }

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();

      const user = users.find(
        (user) => user.email === email && user.username === password
      );

      if (user) {
        alert("Login successful");
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "user", ...user })
        );
        router.push(`/user/${user.id}`);
      } else {
        setError("Invalid email or password (username)");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1224] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1f2a48] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-400">
          Login
        </h2>
        <p className="text-sm text-gray-400 text-center">
          Use your <strong>email</strong> and your <strong>username</strong> as
          password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1224] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">
              Password (Username)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#0d1224] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-2">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-purple-300 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
