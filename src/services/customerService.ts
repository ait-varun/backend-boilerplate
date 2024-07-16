import Customers from "../models/customers";
import { Customer } from "../interfaces/customers";
import { HttpException } from "../exceptions/httpExceptions";

class CustomerService {
  async getAllCustomers(): Promise<Customer[]> {
    const customers = await Customers.findAll();
    if (!customers || customers.length === 0) {
      throw new HttpException(404, "Customers not found");
    }
    return customers;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customer = await Customers.findByPk(id);
    if (!customer) {
      throw new HttpException(404, `Customer with id ${id} not found`);
    }
    return customer;
  }

  async addCustomer(email: string, name: string): Promise<Customer> {
    if (!email || !name) {
      throw new HttpException(400, "Email and name are required");
    }
    const existingCustomer = await Customers.findByEmail(email);
    if (existingCustomer) {
      throw new HttpException(409, "Email already exists");
    }
    return await Customers.create(email, name);
  }

  async deleteCustomer(id: number): Promise<void> {
    const customer = await Customers.findByPk(id);
    if (!customer) {
      throw new HttpException(404, `Customer with id ${id} not found`);
    }
    await Customers.deleteByPk(id);
  }
}

export default new CustomerService();
