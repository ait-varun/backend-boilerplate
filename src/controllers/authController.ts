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

      // console.log("Received signup request for:", email);

      if (!email || !password || !name) {
        throw new HttpException(400, "Email, password, and name are required");
      }

      // console.log("Checking for existing user");
      const existingUser = await Users.findByEmail(email);
      if (existingUser) {
        throw new HttpException(409, "Email already exists");
      }

      console.log("Hashing password");
      const hashedPassword = await bcrypt.hash(password, 10);

      // console.log("Creating new user");
      const newUser = await Users.create(email, hashedPassword, name);

      // console.log("User created successfully");
      res
        .status(201)
        .json({ message: "User created successfully", userId: newUser.id });
    } catch (error) {
      // console.error("Error in signup function:", error);
      throw error;
    }
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HttpException(400, "Email and password are required");
      }

      const user = await Users.findByEmail(email);
      if (!user) {
        throw new HttpException(401, "Invalid Email");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(401, "Invalid Password");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!
      );

      res.cookie("token", token, {
        domain: process.env.DOMAIN,
        sameSite: "strict",
        maxAge: 60 * 1000,
      });

      res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
      console.error("Error in login function:", error);
      throw error;
    }
  }),

  getCurrentUser: asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      try {
        const user = req.user;
        if (!user) {
          throw new HttpException(401, "Not authenticated");
        }

        res.status(200).json({ user });
      } catch (error) {
        console.error("Error in getCurrentUser function:", error);
        throw error;
      }
    }
  ),
};

export default authController;
