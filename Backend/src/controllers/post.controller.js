import postModel from "../models/post.model.js";
import uploadFile from "../services/storage.service.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      author: user._id,
      image: result.url,
      title: title,
      description,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await post.remove();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate("author", "username");
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
