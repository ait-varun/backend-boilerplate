import { Request, Response, NextFunction } from "express";
import customer from "../models/customers";

interface Customer {
  id: number;
  // Add other properties of the Customer interface here
}

const customersController = {
  getAllCustomers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [customers, _] = await customer.findAll();

      res.status(200).json({ customers });
    } catch (error) {
      next(error);
    }
  },
};

export default customersController;
