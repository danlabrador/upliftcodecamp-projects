import jwt from "jsonwebtoken";
import { env } from "../env";

export function createAccessToken(user: { id: string }) {
  return jwt.sign(user, env.JWT_SECRET);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as { id: string };
}
