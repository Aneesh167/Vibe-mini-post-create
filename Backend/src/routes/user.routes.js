import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { updateUserProfile, userProfile } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, userProfile);
userRouter.patch("/update-profile", authMiddleware, updateUserProfile);

export default userRouter;
