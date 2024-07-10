import express, { Router } from "express";
import customersController from "../controllers/customersController";

const router: Router = express.Router();

// @route GET && POST - /customers
router.route("/").get(customersController.getAllCustomers);

router.route("/:id").get(customersController.getCustomerById);

router.route("/add").post(customersController.addCustomer);

router.route("/delete/:id").delete(customersController.deleteCustomer);

export default router;
