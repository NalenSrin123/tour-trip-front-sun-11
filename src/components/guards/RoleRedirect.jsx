import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUser, isAdmin } from "../../services/authService";

const RoleRedirect = () => {
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default RoleRedirect;
