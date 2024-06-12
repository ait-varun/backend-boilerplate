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
};

export default customersController;
