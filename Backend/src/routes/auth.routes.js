import { Router } from "express";
import {
  loginUser,
  logoutAllUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/logout", logoutUser);
authRouter.post("/logout-all", logoutAllUser);

export default authRouter;
