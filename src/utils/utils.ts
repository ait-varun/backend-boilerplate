import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpExceptions";

// Utility function for error handling

/**
 * ! IMPORTANT !
 * This function is Higher-Order Function (HOF) and
 * it returns another function (fn). This fn is expected to be route handler.
 *
 *Promise.resolve() ensures that the result is always a Promise, even if fn *returns a non-Promise value.
 *
 * @param fn - The function to be wrapped.
 * @returns The wrapped function.
 */
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error("Error in asyncHandler:", error);
      if (error instanceof HttpException) {
        next(error);
      } else {
        next(new HttpException(500, "Internal Server Error"));
      }
    });
  };

export { asyncHandler };
