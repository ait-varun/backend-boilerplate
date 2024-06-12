import express from "express";
import customersController from "../controllers/customersController.js";
const router = express.Router();

// @route GET && POST - /posts/
router.route("/").get(customersController.getAllCustomers);
router.route("/addNewCustomer").post(customersController.createNewCustomer);
router.route("/deleteCustomer").delete(customersController.deleteCustomer);

router.route("/:id").get(customersController.getCustomerById);

export default router;
