import { Router } from "express";
import { authenticateUserMiddleware } from "../middlewares/authentication.middleware";
import { getCurrentCourseOfferingsController } from "../controllers/courseofferings/getCurrentCourseOfferings.controller";
import { getCourseOfferingController } from "../controllers/courseofferings/getCourseOffering.controller";

const courseOfferingsRouter = Router();

courseOfferingsRouter.get(
  "/",
  authenticateUserMiddleware,
  getCurrentCourseOfferingsController
);

courseOfferingsRouter.get(
  "/:id",
  authenticateUserMiddleware,
  getCourseOfferingController
);

export { courseOfferingsRouter };
