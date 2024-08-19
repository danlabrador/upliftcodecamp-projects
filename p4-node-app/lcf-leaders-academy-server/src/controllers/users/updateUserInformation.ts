import { asyncHandler } from "../../middlewares/errors.middleware";
import { getUserByID } from "../../data-access/users.mongoose";
import { hashPassword } from "../../util/password";
import { NotFoundError, ValidationError } from "../../util/errors";
import { Request, Response } from "express";
import { UpdateUserBodySchema } from "../../models/validations/users.validations";
import z from "zod";

export const updateUserInformationController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { password, birthDate } = req.body;
      if (password) {
        req.body.password = await hashPassword(password);
      }

      if (birthDate !== undefined) {
        req.body.birthDate = new Date(birthDate as unknown as string);
      }

      // Validate request body
      const body = UpdateUserBodySchema.parse(req.body);

      // Remove authenticatedUser from body
      const { authenticatedUser, ...userInformation } = body;

      // Check if user exists
      const user = await getUserByID(authenticatedUser?.id as string);
      if (!user) {
        throw new NotFoundError("User not found");
      }

      // Update user information
      await user.updateOne(userInformation);

      // Hide password from response
      delete (user as { password?: string }).password;

      res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        throw new ValidationError("Invalid user body.");
      }

      throw error;
    }
  }
);
