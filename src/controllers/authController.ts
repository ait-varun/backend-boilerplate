// Load environment variables from a file
process.loadEnvFile();
import { Request, Response } from "express";
import Users from "../models/user";
import { HttpException } from "../exceptions/httpExceptions";
import { asyncHandler } from "../utils/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/auth";

const authController = {
  signup: asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      console.log("Received signup request for:", email);

      if (!email || !password || !name) {
        throw new HttpException(400, "Email, password, and name are required");
      }

      console.log("Checking for existing user");
      const existingUser = await Users.findByEmail(email);
      if (existingUser) {
        throw new HttpException(409, "Email already exists");
      }

      console.log("Hashing password");
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("Creating new user");
      const newUser = await Users.create(email, hashedPassword, name);

      console.log("User created successfully");
      res
        .status(201)
        .json({ message: "User created successfully", userId: newUser.id });
    } catch (error) {
      console.error("Error in signup function:", error);
      throw error;
    }
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpException(400, "Email and password are required");
    }

    const user = await Users.findByEmail(email);
    if (!user) {
      throw new HttpException(401, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!
    );

    // Set the cookie before sending the response
    res.cookie("token", token, {
      domain: "localhost", // Set the domain to localhost
      sameSite: "strict", // Set the cookie to sameSite
      // maxAge: 24 * 60 * 60 * 1000, // 24 hours
      maxAge: 60 * 1000, // 1 minute
    });

    // Send the response
    res.status(200).json({ message: "success", token });
  }),

  getCurrentUser: asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const user = req.user;
      if (!user) {
        throw new HttpException(401, "Not authenticated");
      }

      res.status(200).json({ user });
    }
  ),
};

export default authController;
