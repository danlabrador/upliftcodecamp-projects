import { Request, Response, NextFunction } from "express";
import {
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../util/errors";
import { env } from "../env";

const pageNotFound = (_: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
};

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env.NODE_ENV === "development" && env.LOG_ERRORS === "true") {
    console.error(err);
  }
  if (
    err instanceof ValidationError ||
    err instanceof AuthenticationError ||
    err instanceof AuthorizationError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError
  ) {
    return res.status(err.status).json({ message: err.message });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const asyncHandler = (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export { errorHandler, pageNotFound, asyncHandler };
