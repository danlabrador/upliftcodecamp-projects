import { asyncHandler } from "../../middlewares/errors.middleware";
import { AuthenticationError, ValidationError } from "../../util/errors";
import { createAccessToken } from "../../util/jwt";
import { getUserByEmail } from "../../data-access/users.mongoose";
import { LogInViaGoogleBodySchema } from "../../models/validations/auth.validations";
import { Request, Response } from "express";
import { UserSession } from "../types";
import z from "zod";

export const logInViaGoogleController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const body = LogInViaGoogleBodySchema.parse(req.body);
      if (!body.user.email) {
        throw new AuthenticationError();
      }

      const user = await getUserByEmail(body.user.email);

      if (!user) {
        throw new AuthenticationError();
      }

      const userSession: UserSession = {
        id: user._id,
      };

      res.status(200).json({
        accessToken: createAccessToken(userSession),
        body,
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        console.log(error.errors);
        throw new ValidationError("Invalid user body.");
      }

      throw error;
    }
  }
);
