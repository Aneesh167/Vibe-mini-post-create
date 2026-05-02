import { api } from "./axios";

export const getProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};
export const updateProfile = async (data) => {
  const res = await api.patch("/user/update-profile", data);
  return res.data;
};
