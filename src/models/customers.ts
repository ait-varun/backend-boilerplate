import pool from "../config/db";
import { RowDataPacket } from "mysql2";
import { Customer } from "../interfaces/customers";

class Customers {
  static async findAll(): Promise<Customer[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM customers");
    return rows as Customer[];
  }
}

export default Customers;
