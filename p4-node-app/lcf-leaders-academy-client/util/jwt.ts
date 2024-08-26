import jwt, { Secret } from "jsonwebtoken";

export function createAccessToken(user: { id: string }) {
  const jwtSecret: Secret =
    process.env.JWT_SECRET || "xZd9DcF2pKsRYh5huw74eiNpfJvxvDaNP5e2v961+o0=";
  return jwt.sign(user, jwtSecret);
}
