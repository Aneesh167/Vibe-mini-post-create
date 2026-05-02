import postModel from "../models/post.model.js";

export const userProfile = async (req, res) => {
  try {
    const user = req.user;
    const post = await postModel.find({ author: user._id });
    if (!post) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        name: user.name,
      },
      posts: post,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const user = req.user;
    const { bio, name } = req.body;
    if (bio) {
      user.bio = bio;
      await user.save();
    }
    if (name) {
      user.name = name;
      await user.save();
    }
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      name: user.name,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
