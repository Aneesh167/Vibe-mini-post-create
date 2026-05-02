import { api } from "./axios";

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
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
  const res = await api.post("/auth/refresh-token");
  return res.data;
};
