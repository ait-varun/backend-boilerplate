import pool from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Customer } from "../interfaces/customers";

class Customers {
  static async findAll(): Promise<Customer[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM customers");
    return rows as Customer[];
  }

  static async findByPk(id: number): Promise<Customer | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM customers WHERE id = ?",
      [id]
    );
    return rows[0] as Customer | null;
  }

  static async findByEmail(email: string): Promise<Customer | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM customers WHERE email = ?",
      [email]
    );
    return rows[0] as Customer | null;
  }

  static async create(email: string, name: string): Promise<Customer> {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO customers (email, name) VALUES (?, ?)",
      [email, name]
    );
    const insertedId = result.insertId;
    return this.findByPk(insertedId) as Promise<Customer>;
  }

  static async deleteByPk(id: number): Promise<void> {
    await pool.query<ResultSetHeader>("DELETE FROM customers WHERE id = ?", [
      id,
    ]);
  }
}

export default Customers;
