import React, { createContext, useState, useEffect } from "react";
import { apiClient } from "../clients/api";
import type { User } from "../types";

// Auth context interface
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logIn: (email: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logOut: () => void;
}

// Create Auth context
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

// AuthProvider wraps the whole app
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    const saved = localStorage.getItem("token");
    return saved ? JSON.parse(saved) : null;
  });

  // Sync user with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Sync token with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", JSON.stringify(token));
    else localStorage.removeItem("token");
  }, [token]);

  // Login function
  const logIn = async (email: string, password: string) => {
    const res = await apiClient.post("/api/users/login", { email, password });
    const { user: u, token: t } = res.data;
    setUser(u);
    setToken(t);
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    console.log(username,email,password)
    const res = await apiClient.post("/api/users/register", {
      username,
      email,
      password,
    });
    const { user: u, token: t } = res.data;
    setUser(u);
    setToken(t);
  };

  // Logout function
  const logOut = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logIn, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}