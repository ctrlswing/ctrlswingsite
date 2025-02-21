"use client";

import { useState } from "react";

export default function EmailOptIn() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={subscribe} className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                     transition-colors duration-200 disabled:opacity-50
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
        {message && (
          <p
            className={`text-sm ${
              status === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
