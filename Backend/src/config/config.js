import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("Mongo_URI is not defined in env file");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in env file");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in env file");
}
if (!process.env.IMG_PRIVATE_KEY) {
  throw new Error("IMG_PRIVATE_KEY is not defined in env file");
}
if (!process.env.IMG_PRIVATE_KEY) {
  throw new Error("IMG_PRIVATE_KEY is not defined in env file");
}
if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined in env file");
}

export const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  IMG_PRIVATE_KEY: process.env.IMG_PRIVATE_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
