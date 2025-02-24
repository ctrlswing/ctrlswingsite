"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailOptIn() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

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
      
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email"
          required
          className="flex-1 px-4 py-2 bg-transparent border-b border-gray-300 dark:border-gray-700
                   text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#fee28320] dark:focus:border-[#ffec8e20]
                   transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 bg-[#fee283] text-gray-900 rounded-md hover:bg-[#f6d484]
                   transition-colors duration-200 disabled:opacity-50 text-sm font-medium"
        >
          {status === "loading" ? "Subscribing..." : "subscribe"}
        </button>
        {message && (
          <p
            className={`text-sm mt-2 ${
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
