import { Router, Request, Response, NextFunction } from "express";
import customersRouter from "./customersRoutes";
import { logger } from "../utils/logger";

const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Hello World!");

  logger.info("Home page requested");
});

router.use("/customers", customersRouter);

// Catch-all route for non-existent routes
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "This route does not exist" });
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
});

export default router;
