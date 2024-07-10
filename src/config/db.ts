// Load environment variables from a file
process.loadEnvFile();

import mysql, { PoolOptions, createPool } from "mysql2";
import { Database } from "../interfaces/database";
import { Kysely, MysqlDialect } from "kysely";

// const access: PoolOptions = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
// };

const dialect = new MysqlDialect({
  pool: createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});