import { apiFetch } from "./api";

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

const setAuth = (data) => {
  if (data?.access_token) localStorage.setItem(TOKEN_KEY, data.access_token);
  if (data?.data) localStorage.setItem(USER_KEY, JSON.stringify(data.data));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const login = async (email, password) => {
  const data = await apiFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAuth(data);
  return data;
};

export const register = async (userData) => {
  return await apiFetch("/api/register", {
    method: "POST",
    body: JSON.stringify({
      full_name: userData.full_name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      password_confirmation: userData.password_confirmation || userData.password,
      role_id: userData.role_id || 1,
    }),
  });
};

export const getProfile = async () => {
  const data = await apiFetch("/api/me");
  if (data?.data) localStorage.setItem(USER_KEY, JSON.stringify(data.data));
  return data;
};

export const logout = async () => {
  try {
    await apiFetch("/api/logout", { method: "POST" });
  } finally {
    clearAuth();
  }
};

export const forgotPassword = async (email) => {
  return await apiFetch("/api/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const verifyCode = async (email, code) => {
  return await apiFetch("/api/verify-code", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
};