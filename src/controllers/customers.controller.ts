import { Request, Response } from "express";
import { asyncHandler } from "../utils/utils";
import customerService from "../services/customers.service";

class CustomersController {
  getAllCustomers = asyncHandler(async (req: Request, res: Response) => {
    const customers = await customerService.getAllCustomers();
    res.status(200).json({ totalCustomers: customers.length, customers });
  });

  getCustomerById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(Number(id));
    res.status(200).json({ customer });
  });

  addCustomer = asyncHandler(async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const newCustomer = await customerService.addCustomer(email, name);
    res
      .status(201)
      .json({ message: "Customer created successfully", newCustomer });
  });

  deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await customerService.deleteCustomer(Number(id));
    res
      .status(200)
      .json({ message: `Customer with id ${id} deleted successfully` });
  });
}

export default new CustomersController();
