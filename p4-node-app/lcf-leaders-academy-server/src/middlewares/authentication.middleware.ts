import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticationError } from "../util/errors";
import { verifyAccessToken } from "../util/jwt";

const UserSessionSchema = z.object({
  id: z.string(),
});

type UserSession = z.infer<typeof UserSessionSchema>;

export function authenticateUserMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.authorization) {
      throw new AuthenticationError();
    }
    const token = req.headers.authorization.split(" ")[1];
    const authenticatedUser = verifyAccessToken(token) as UserSession;
    UserSessionSchema.parse(authenticatedUser);
    req.body.authenticatedUser = authenticatedUser;
    next();
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new AuthenticationError();
    } else {
      next(e);
    }
  }
}
