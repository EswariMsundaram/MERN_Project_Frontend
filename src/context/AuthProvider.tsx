import React, {createContext, useState, useEffect} from "react";
import type {User} from "../types";
import {apiClient} from "../clients/api";

interface AuthContextType {
  user: User | null; //Logged-in user info
  setUser: (user: User|null) => void; //Manually update user
  logIn: (email: string, password: string) => void; 
  register: (username: string, email: string, password: string) => void;
  logOut: () => void;
  token: string | null; //JWT token from backend
  setToken: (token: string|null) => void; //Manually update token
}

// eslint-disable-next-line react-refresh/only-export-components

//Create Auth context with default value null
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // Checks if there is a token in localStorage and set them in state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem("user")
      return value ? JSON.parse(value) : null //convert JSON->object
    } catch {
      return null
    }
  });

  //token state restored from local storage
  const [token, setToken] = useState<string | null>(() => {
    try {
      const value = localStorage.getItem("token")
      return value ? JSON.parse(value) : null
    } catch  {
      return null
    }
  });

  //this keeps the user saved in local storage so anytime "user" state changes
  useEffect(() => {
    if(user) {
        localStorage.setItem("user", JSON.stringify(user))
    }else {
        localStorage.removeItem("user") //remove when logout
    }
    }, [user]);

   // Keeps the token saved in local storage and the token state changes anytime
   useEffect(()=>{
    if(token) {
         localStorage.setItem("token", JSON.stringify(token))
    }else{
        localStorage.removeItem("token")
    }
   },[token])

   //Login function
  const logIn = async (email: string, password: string) => {
    const res=await apiClient.post("/api/users/login", {email,password}) //calls backend
    //backend returns user and token
    const {user:userData, token:jwt}=res.data
    setUser(userData) //set the logged in user
    setToken(jwt) //set the JWT token
  };

  //Register function
  const register = async (username: string, email: string, password: string) => {
    //calls the backend
    const res=await apiClient.post("/api/users/register",{
        username, email, password
    })
    const {user:userData, token:jwt}=res.data // saves user and token
    setUser(userData)
    setToken(jwt)
  };

  //logout functions - clears everything
  const logOut = () => {
    setUser(null)
    setToken(null)
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}