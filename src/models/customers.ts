import pool from "../config/db";
import { RowDataPacket } from "mysql2";

interface Customer {
  id?: number;
  name?: string;
  email?: string;
  // Add other properties as needed
}

class Customers {
  static async findAll(): Promise<Customer[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM customers");
    return rows as Customer[];
  }

  static async findById(id: number): Promise<Customer | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );
    return (rows[0] as Customer) || null;
  }
}

export default Customers;
