import { api } from "./axios";

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  // Store refresh token if received
  if (res.data.refreshToken) {
    localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  return res.data;
};
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  // Store refresh token if received
  if (res.data.refreshToken) {
    localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  return res.data;
};
export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
export const logoutAllUser = async () => {
  const res = await api.post("/auth/logout-all");
  return res.data;
};
export const refreshToken = async () => {
  // Get refresh token from localStorage if stored, otherwise from cookie
  const storedRefreshToken = localStorage.getItem("refreshToken");
  const headers = {};

  if (storedRefreshToken) {
    headers.Authorization = `Bearer ${storedRefreshToken}`;
  }

  const res = await api.post("/auth/refresh-token", {}, { headers });
  return res.data;
};
