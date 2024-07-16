// Load environment variables from a file
process.loadEnvFile();
import { Request, Response } from "express";
import { HttpException } from "../exceptions/httpExceptions";
import { asyncHandler } from "../utils/utils";
import { AuthenticatedRequest } from "../interfaces/auth";
import AuthService from "../services/authService";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signup = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const newUser = await this.authService.signup(email, password, name);
    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { token, user } = await this.authService.login(email, password);
    res.cookie("token", token, {
      domain: process.env.DOMAIN,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({ message: "Login successful!", token, user });
  });

  getCurrentUser = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const user = await this.authService.getCurrentUser(req.user);
      res.status(200).json({ user });
    }
  );
}

export default new AuthController();
