import { Router } from "express";
import customersRouter from "./customersRoutes";
import { logger } from "../utils/logger";

const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Hello World!");

  logger.info("Home page requested");
});

router.use("/customers", customersRouter);

export default router;
