import { Router } from "express";
import customersRouter from "./customersRoutes";
import { httpLogger } from "../services/logger";

const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Hello World!");

  httpLogger.info("Home page requested");
});

router.use("/customers", customersRouter);

export default router;
