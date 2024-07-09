import express, { Router } from "express";
import customersController from "../controllers/customersController";

const router: Router = express.Router();

// @route GET && POST - /posts/
router.route("/").get(customersController.getAllCustomers);

router.route("/:id").get(customersController.getCustomerById);

export default router;
