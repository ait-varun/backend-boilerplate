import { Request, Response, NextFunction } from "express";
import customer from "../models/customers";
import { HttpException } from "../exceptions/httpExceptions";

const customersController = {
  getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await customer.findAll();
      res.status(200).json({ customers });
    } catch (error) {
      next(new HttpException(404, "Customers not found"));
    }
  },

  getCustomerById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const customers = await customer.findByPk(Number(id));
      if (customer.length) {
        res.status(200).json({ customers });
      }
      next(new HttpException(404, "Customer not found"));
    } catch (error) {
      next(new HttpException(404, "Customer may not Exist"));
    }
  },
};

export default customersController;
