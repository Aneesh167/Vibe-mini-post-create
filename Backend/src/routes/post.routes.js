import multer from "multer";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../controllers/post.controller.js";

const upload = multer({ storage: multer.memoryStorage() });
const postRouter = Router();

postRouter.post(
  "/createpost",
  authMiddleware,
  upload.single("image"),
  createPost,
);
postRouter.get("/getallposts", authMiddleware, getAllPosts);
postRouter.delete("/deletepost/:id", authMiddleware, deletePost);

export default postRouter;
