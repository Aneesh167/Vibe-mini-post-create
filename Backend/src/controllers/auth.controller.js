import bcrypt from "bcrypt";
import {
  accessTokenCreate,
  refreshAccessToken,
  tokenHash,
  verifyToken,
} from "../config/token.js";
import { userModel } from "../models/user.model.js";
import { sessionModel } from "../models/session.model.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const clearSessions = async () => {
  await sessionModel.deleteMany({
    revoked: true,
    updatedAt: {
      $lt: new Date(Date.now() - 100000),
    },
  });
};
export const registerUser = async (req, res) => {
  try {
    await clearSessions();
    let { email, username, password } = req.body;
    email = email?.trim().toLowerCase();
    username = username?.trim().toLowerCase();
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name: username,
      email,
      username,
      password: hashedPassword,
    });
    const userId = user.id || user._id;
    const refreshToken = refreshAccessToken(userId);
    const refreshTokenHash = tokenHash(refreshToken);

    const session = await sessionModel.create({
      user: userId,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const sessionId = session.id || session._id;
    const accessToken = accessTokenCreate(userId, sessionId);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: userId,
        email: user.email,
        username: user.username,
      },
      accessToken,
      refreshToken, // Include refresh token in response
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    await clearSessions();
    let { email, password } = req.body;
    email = email?.trim().toLowerCase();
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userId = user.id || user._id;
    const refreshToken = refreshAccessToken(userId);
    const refreshTokenHash = tokenHash(refreshToken);
    const session = await sessionModel.create({
      user: userId,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
    const sessionId = session.id || session._id;
    const accessToken = accessTokenCreate(userId, sessionId);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: userId,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken, // Include refresh token in response
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const refreshToken = async (req, res) => {
  try {
    let refreshToken = req.cookies.refreshToken;

    // Also check Authorization header for refresh token
    if (!refreshToken) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        refreshToken = authHeader.split(" ")[1];
      }
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyToken(refreshToken);
    const userId = decoded.id;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const refreshTokenHash = tokenHash(refreshToken);
    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }

    const sessionId = session.id || session._id;
    const accessToken = accessTokenCreate(userId, sessionId);
    const newRefreshToken = refreshAccessToken(userId);
    const newRefreshTokenHash = tokenHash(newRefreshToken);

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const refreshTokenHash = tokenHash(refreshToken);
    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });
    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }
    session.revoked = true;
    session.revokedAt = new Date();
    await session.save();
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const logoutAllUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = verifyToken(refreshToken);
    const userId = decoded.id;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    const session = await sessionModel.updateMany(
      {
        user: userId,
        revoked: false,
      },
      {
        revoked: true,
        revokedAt: new Date(),
      },
    );
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ message: "Logout from all devices successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
