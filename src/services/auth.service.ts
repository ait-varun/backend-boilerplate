import Users from "../models/user.model";
import { HttpException } from "../exceptions/httpExceptions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  async signup(email: string, password: string, name: string) {
    if (!email || !password || !name) {
      throw new HttpException(400, "Email, password, and name are required");
    }

    const existingUser = await Users.findByEmail(email);
    if (existingUser) {
      throw new HttpException(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create(email, hashedPassword, name);

    return newUser;
  }

  async login(email: string, password: string) {
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

    return { token, user };
  }

  async getCurrentUser(user: any) {
    if (!user) {
      throw new HttpException(401, "Not authenticated");
    }

    return user;
  }
}

export default AuthService;
