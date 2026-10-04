import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUser, isAdmin } from "../../services/authService";

const PublicRoute = ({ children }) => {
  const token = getToken();
  const user = getUser();

  if (token && user) {
    if (isAdmin()) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
