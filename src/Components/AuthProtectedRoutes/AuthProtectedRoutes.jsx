import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthProtectedRoutes({ children }) {
  const { userToken } = useContext(authContext);
  if (userToken !== null) {
    return <Navigate to={"/home"} />;
  }
  return <div>{children}</div>;
}
