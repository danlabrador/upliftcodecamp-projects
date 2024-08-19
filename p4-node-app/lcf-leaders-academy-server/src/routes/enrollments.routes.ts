import { Router } from "express";
import { authenticateUserMiddleware } from "../middlewares/authentication.middleware";
import { createEnrollmentController } from "../controllers/enrollments/createEnrollment.controller";
import { getEnrollmentByIDController } from "../controllers/enrollments/getEnrollment.controller";
import { deleteEnrollmentByIDController } from "../controllers/enrollments/deleteEnrollment.controller";

const enrollmentsRouter = Router();

enrollmentsRouter.post(
  "/",
  authenticateUserMiddleware,
  createEnrollmentController
);

enrollmentsRouter.get(
  "/:id",
  authenticateUserMiddleware,
  getEnrollmentByIDController
);

enrollmentsRouter.delete(
  "/:id",
  authenticateUserMiddleware,
  deleteEnrollmentByIDController
);

export { enrollmentsRouter };
