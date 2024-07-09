import { Request, Response, NextFunction } from "express";
import customer from "../models/customers";
import { HttpException } from "../exceptions/httpExceptions";

const customersController = {
  getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [customers, _] = await customer.findAll();
      res.status(200).json({ customers });
    } catch (error) {
      next(new HttpException(404, "Customers not found"));
    }
  },
};

export default customersController;
