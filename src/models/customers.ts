import pool from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Customer } from "../interfaces/customers";

class Customers {
  static async findAll(): Promise<Customer[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM customers");
    return rows as Customer[];
  }

  static async findByPk(id: number): Promise<Customer> {
    const [row] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );
    return row[0] as Customer;
  }

  static async create(email: string, name: string): Promise<Customer> {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO customers (email, name) VALUES (?, ?)",
      [email, name]
    );
    const insertedId = result.insertId;
    return this.findByPk(insertedId);
  }

  static async deleteByPk(id: number): Promise<void> {
    await pool.query<ResultSetHeader>("DELETE FROM customers WHERE id = ?", [
      id,
    ]);
  }
}

export default Customers;
