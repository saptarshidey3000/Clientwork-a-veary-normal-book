import React, { useState } from "react";

const AuthGate = ({ onSuccess }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctCode = "5624"; // Client's code

    if (code === correctCode) {
      onSuccess(); // Grant access
    } else {
      setError("Invalid code. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#9cb9b7] to-[#6d8785]">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-semibold text-white drop-shadow mb-6">
          🔒 Enter Access Code
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="password"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-32 p-3 rounded-lg text-black text-center text-2xl tracking-[0.5em] bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="****"
          />
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium text-lg hover:opacity-90 transition"
          >
            Unlock
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-300 font-medium animate-pulse">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AuthGate;
