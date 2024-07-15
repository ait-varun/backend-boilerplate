import { Request, Response, NextFunction } from "express";
import customer from "../models/customers";
import { HttpException } from "../exceptions/httpExceptions";
import { asyncHandler } from "../utils/utils";

const customersController = {
  getAllCustomers: asyncHandler(async (req: Request, res: Response) => {
    const customers = await customer.findAll();
    if (!customers) {
      throw new HttpException(404, "Customers not found");
    }
    res.status(200).json({ totalCustomers: customers.length, customers });
  }),

  getCustomerById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const customers = await customer.findByPk(Number(id));
    if (!customers) {
      throw new HttpException(404, `Customer with id ${id} not found`);
    }
    res.status(200).json({ customers });
  }),

  addCustomer: asyncHandler(async (req: Request, res: Response) => {
    const { email, name } = req.body;
    if (!email || !name) {
      throw new HttpException(400, "Email and name are required");
    }
    const existingCustomer = await customer.findByEmail(email);
    if (existingCustomer) {
      throw new HttpException(409, "Email already exists");
    }
    const newCustomer = await customer.create(email, name);
    res
      .status(201)
      .json({ message: "Customer created successfully", newCustomer });
  }),

  deleteCustomer: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const customers = await customer.findByPk(Number(id));
    if (!customers) {
      throw new HttpException(404, `Customer with id ${id} not found`);
    }
    await customer.deleteByPk(Number(id));
    res
      .status(200)
      .json({ message: `Customer with id ${id} deleted successfully` });
  }),
};

export default customersController;
