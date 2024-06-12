import customer from "../models/customers.js";

const customersController = {
  getAllCustomers: async (req, res, next) => {
    try {
      // customers contains rows returned by server fields contains extra meta data about rows, if available
      const [customers, fields] = await customer.findAll();

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
