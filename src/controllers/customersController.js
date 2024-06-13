import { where } from "sequelize";
import customer from "../models/customers.js";

const customersController = {
  /**
   * Retrieves all customers from the database.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - Resolves with a JSON response containing the total number of customers and the customer data.
   */
  getAllCustomers: async (req, res, next) => {
    try {
      // customers contains rows returned by server fields contains extra meta data about rows, if available
      const customers = await customer.findAll({
        attributes: ["*", "id", "first_name", "last_name", "email"],
      });

      res.status(200).json({ totalCustomers: customers.length, customers });
    } catch (error) {
      next(error);
    }
  },

  getCustomerById: async (req, res, next) => {
    try {
      let customerId = req.params.id;

      let customers = await customer.findOne({
        where: { id: customerId },
      });

      if (!customers) {
        return res
          .status(404)
          .json({ error: `Customer with id ${customerId} not found` });
      }

      res.status(200).json({ customer: customers });
    } catch (error) {
      next(error);
    }
  },

  createNewCustomer: async (req, res, next) => {
    try {
      let createdCustomer = req.body;

      if (!createdCustomer.email) {
        return res.status(400).json({
          error: "Email is required",
        });
      }

      if (!createdCustomer.first_name) {
        return res.status(400).json({
          error: "First name is required",
        });
      }

      if (!createdCustomer.last_name) {
        return res.status(400).json({
          error: "Last name is required",
        });
      }

      //Check if the customer already exists
      let [customers, field] = await customer.findByEmail(
        createdCustomer.email
      );
      if (customers.length > 0) {
        return res.status(409).json({
          error: `Customer with name ${createdCustomer.email} already exists`,
        });
      }

      let [newCustomer, _] = await customer.createNewCustomer(createdCustomer);
      res.status(201).json({ customer: newCustomer });
    } catch (error) {
      next(error);
    }
  },

  deleteCustomer: async (req, res, next) => {
    try {
      let customerId = req.body.id;

      // Check if the customer exists
      let [customers, field] = await customer.findById(customerId);
      if (customers.length === 0) {
        return res
          .status(404)
          .json({ error: `Customer with id ${customerId} not found` });
      }

      await customer.deleteCustomer(customerId);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};

export default customersController;
