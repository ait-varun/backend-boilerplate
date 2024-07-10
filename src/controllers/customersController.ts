import { Request, Response, NextFunction } from "express";
import customer from "../models/customers";
import { HttpException } from "../exceptions/httpExceptions";

const customersController = {
  getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await customer.findAll();
      if (!customers || customers.length === 0) {
        res.status(404).json({ message: "Customers not found" });
        return next(new HttpException(404, "Customers not found"));
      }
      res.status(200).json({ totalCustomers: customers.length, customers });
    } catch (error) {
      next(new HttpException(404, "Customers not found"));
    }
  },

  getCustomerById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const customers = await customer.findByPk(Number(id));
      if (!customers) {
        return next(new HttpException(404, `Customer with id ${id} not found`));
      }
      res.status(200).json({ customers });
    } catch (error) {
      next(new HttpException(500, "Internal Server Error"));
    }
  },
};

export default customersController;
