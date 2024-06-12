import customer from "../models/customers.js";

const customersController = {
  getAllCustomers: async (req, res, next) => {
    try {
      const [customers, _] = await customer.findAll();

      res.status(200).json({ totalCustomers: customers.length, customers });
    } catch (error) {
      next(error);
    }
  },

  getCustomerById: async (req, res, next) => {
    try {
      let customerId = req.params.id;

      let [customers, _] = await customer.findById(customerId);

      res.status(200).json({ customer: customers[0] });
    } catch (error) {
      next(error);
    }
  },

  createNewCustomer: async (req, res, next) => {
    try {
      let createdCustomer = req.body;

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

      let [deletedCustomer, _] = await customer.deleteCustomer(customerId);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};

export default customersController;
