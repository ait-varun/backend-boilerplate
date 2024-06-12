const express = require("express");
const customersControllers = require("../controllers/customersController.js");
const router = express.Router();

// @route GET && POST - /posts/
router.route("/").get(customersControllers.getAllCustomers);

router.route("/:id").get(customersControllers.getCustomerById);

module.exports = router;
