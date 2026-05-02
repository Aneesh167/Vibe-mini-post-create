import jwt from "jsonwebtoken";
import { config } from "./config.js";
import crypto from "crypto";

export function accessTokenCreate(userId, sessionId) {
  return jwt.sign({ id: userId, sessionId }, config.JWT_SECRET, {
    expiresIn: "15m",
  });
}
export function refreshAccessToken(id) {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}

export function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
