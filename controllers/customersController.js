import customer from "../models/customers.js";

const customersController = {
  getAllCustomers: async (req, res, next) => {
    try {
      const [customers, _] = await customer.findAll();

      res.status(200).json({ count: customers.length, customers });
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

      let [deletedCustomer, _] = await customer.deleteCustomer(customerId);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};

export default customersController;
