import { Router } from "express";
import { authenticateUserMiddleware } from "../middlewares/authentication.middleware";
import { getActiveStudentEnrollmentsController } from "../controllers/users/getActiveStudentEnrollments.controller";
import { updateUserInformationController } from "../controllers/users/updateUserInformation";
import { getUserByEmailController } from "../controllers/users/getUserByEmail.controller";

const usersRouter = Router();

usersRouter.get(
  "/:id/enrollments",
  authenticateUserMiddleware,
  getActiveStudentEnrollmentsController
);

usersRouter.patch(
  "/:id",
  authenticateUserMiddleware,
  updateUserInformationController
);

usersRouter.get(
  "/email/:email",
  authenticateUserMiddleware,
  getUserByEmailController
);

export { usersRouter };
