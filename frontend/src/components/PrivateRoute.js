import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
