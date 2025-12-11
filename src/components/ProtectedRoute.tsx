import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useContext(AuthContext);

  //if AuthContext is missing, redirects and replace
  if (!auth || !auth.user) {
    return <Navigate to="/auth" replace />;
  }
    

//if logged in show the protected page
  return children;
}