import { Router } from "express";
import customersRouter from "./customersRoutes";

const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/customers", customersRouter);

export default router;
