import { Router } from "express";
import { authenticateUserMiddleware } from "../middlewares/authentication.middleware";
import { getCurrentCourseOfferingsController } from "../controllers/courseofferings/getCurrentCourseOfferings.controller";

const courseOfferingsRouter = Router();

courseOfferingsRouter.get(
  "/",
  authenticateUserMiddleware,
  getCurrentCourseOfferingsController
);

export { courseOfferingsRouter };
