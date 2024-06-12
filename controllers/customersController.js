const customer = require("../models/customers.js");

exports.getAllCustomers = async (req, res, next) => {
  try {
    const [customers, _] = await customer.findAll();

    res.status(200).json({ count: customers.length, customers });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    let customerId = req.params.id;

    let [customer, _] = await customer.findById(postId);

    res.status(200).json({ post: post[0] });
  } catch (error) {
    next(error);
  }
};
