import { Request } from "express";

interface JwtPayload {
  userId: string;
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
