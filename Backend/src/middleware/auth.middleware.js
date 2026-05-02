import { verifyToken } from "../config/token.js";
import { sessionModel } from "../models/session.model.js";
import { userModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = decoded.id;
    const user = await userModel.findById(userId);
    const sessionId = decoded.sessionId;
    if (!sessionId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    const session = await sessionModel.findOne({
      _id: sessionId,
      revoked: false,
    });
    if (!session) {
      return res.status(401).json({ message: "Invalid session" });
    }
    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
