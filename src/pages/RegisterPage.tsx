import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Registration screen for creating a new account
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useContext(AuthContext);

  const handleRegister = () => {
    if (auth) {
      auth.register(username, email, password);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Register</h1>

      {/* Username input */}
      <input
        className="block mt-4 p-2 text-black"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Email input */}
      <input
        className="block mt-4 p-2 text-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password input */}
      <input
        className="block mt-4 p-2 text-black"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-green-600 px-4 py-2 mt-4 rounded"
      >
        Register
      </button>
    </div>
  );
}