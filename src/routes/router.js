import { Router } from "express";
import customersRouter from "./customersRoutes.js";

const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/customers", customersRouter);

export default router;
