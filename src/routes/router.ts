import { Router, Request, Response, NextFunction } from "express";
import customersRouter from "./customersRoutes";
import { logger } from "../utils/logger";
import { authenticateToken } from "../middleware/authenticationToken";
import { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/auth";
import authController from "../controllers/authController";


const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Hello World!");

  logger.info("Home page requested");
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// router.get("/me", authenticateToken, (req: Request, res: Response) => {
//   const authenticatedReq = req as AuthenticatedRequest;
//   if (authenticatedReq.user) {
//     const { email, userId } = authenticatedReq.user;
//     res.json({ email, userId });
//   } else {
//     res.status(401).json({ message: "User not authenticated" });
//   }
// });

router.use("/customers", authenticateToken, customersRouter);

// Catch-all route for non-existent routes
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "This route does not exist" });
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
});

export default router;
