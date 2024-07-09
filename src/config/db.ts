// Load environment variables from a file
process.loadEnvFile();

import mysql, { PoolOptions } from "mysql2";

const access: PoolOptions = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(access);

export default pool.promise();
