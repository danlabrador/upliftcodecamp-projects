import { Router } from "express";
import { logInViaGoogleController } from "../controllers/auth/login.controller";

const authRouter = Router();

authRouter.post("/login", logInViaGoogleController);

export { authRouter };
