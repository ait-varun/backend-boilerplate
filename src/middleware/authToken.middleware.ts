import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions/httpExceptions";

// Define the structure of our JWT payload
interface JwtPayload {
  email: string;
  // Remove password from payload for security reasons
  // Add any other fields you want in the token
  userId: string;
}

// Extend the Express Request type
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new HttpException(401, "Authentication token required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    throw new HttpException(403, "Invalid or expired token");
  }
};
