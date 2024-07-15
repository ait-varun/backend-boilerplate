import pool from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { User } from "../interfaces/user";

class Users {
  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0] as User | null;
  }

  static async create(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, password, name]
    );
    const insertedId = result.insertId;
    return { id: insertedId, email, password, name };
  }
}

export default Users;
