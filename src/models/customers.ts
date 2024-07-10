import { db } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Customer } from "../interfaces/customers";

class Customers {
  static async findAll(): Promise<Customer[]> {
    const rows = await db.selectFrom("customers").selectAll().execute();
    return rows as Customer[];
  }

  static async findByPk(id: number): Promise<Customer> {
    const row = await db
      .selectFrom("customers")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
    return row as Customer;
  }

  static async findByEmail(email: string): Promise<Customer | null> {
    const row = await db
      .selectFrom("customers")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
    return row ? (row as Customer) : null;
  }

  static async create(email: string, name: string): Promise<Customer> {
    const result = await db
      .insertInto("customers")
      .values({ email, name })
      .executeTakeFirstOrThrow();

    const insertedId =
      typeof result.insertId === "bigint"
        ? Number(result.insertId)
        : result.insertId;

    return this.findByPk(insertedId ? insertedId : 0);
  }

  static async deleteByPk(id: number): Promise<void> {
    await db.deleteFrom("customers").where("id", "=", id).execute();
  }
}

export default Customers;
