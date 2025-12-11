import { createContext, useState } from "react";
import type { User } from "../types";

// Interface describing what the AuthContext will provide
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logIn: (username: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logOut: () => void;
}

// Create the AuthContext with default null
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider wrapper for the whole app
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // Load the user from localStorage when app starts
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Load token from localStorage when app starts
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? JSON.parse(savedToken) : null;
  });

  // Login function (you will write API request later)
  const logIn = async (username: string, password: string) => {
    console.log("Login not implemented yet");
  };

  // Register function (you will write API request later)
  const register = async (username: string, email: string, password: string) => {
    console.log("Register not implemented yet");
  };

  // Logout clears localStorage
  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, logIn, register, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}