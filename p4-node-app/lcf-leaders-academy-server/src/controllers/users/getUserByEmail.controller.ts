import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/errors.middleware";
import { getUserByEmail } from "../../data-access/users.mongoose";

export const getUserByEmailController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUserByEmail(req.params.email);
    if (!user) {
      res.status(404).json({ message: "No user found." });
    }
    res.status(200).json(user);
  }
);
