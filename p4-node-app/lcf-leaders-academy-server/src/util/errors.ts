export const AUTHENTICATION_ERROR_MESSAGE =
  "You must be logged in to complete this action";

export const AUTHORIZATION_ERROR_MESSAGE =
  "You are not authorized to complete this action";

export const AuthenticationError = class AuthenticationError extends Error {
  public status: number = 401;
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const AuthorizationError = class AuthorizationError extends Error {
  public status: number = 403;
  constructor() {
    super(AUTHORIZATION_ERROR_MESSAGE);
    this.name = "AuthorizationError";
  }
};

export const ConflictError = class ConflictError extends Error {
  public status: number = 409;
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
};

export const NotFoundError = class NotFoundError extends Error {
  public status: number = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
};

export const ValidationError = class ValidationError extends Error {
  public status: number = 400;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
};
