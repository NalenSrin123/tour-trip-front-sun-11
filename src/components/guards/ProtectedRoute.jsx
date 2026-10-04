import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser, isAdmin } from "../../services/authService";

const ProtectedRoute = ({ requireAdmin = false }) => {
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
