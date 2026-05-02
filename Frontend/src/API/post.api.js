import { api } from "./axios";

export const createPost = async (formData) => {
  const res = await api.post("/post/createpost", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const getAllPosts = async () => {
  const res = await api.get("/post/getallposts");
  return res.data;
};
export const deletePost = async (id) => {
  const res = await api.delete(`/post/deletepost/${id}`);
  return res.data;
};
