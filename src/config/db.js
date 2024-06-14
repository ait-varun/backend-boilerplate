// Load environment variables from a file
process.loadEnvFile();
import { Sequelize } from "sequelize";

/**
 * Loads the database connection credentials from environment variables.
 * These credentials are used to establish a connection to the MySQL database.
 * The environment variables are:
 * - DB_USER: The username for the database connection.
 * - DB_PASSWORD: The password for the database connection.
 * - DB_NAME: The name of the database to connect to.
 * - DB_HOST: The hostname or IP address of the database server.
 */

const userName = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, userName, password, {
  host: host,
  dialect: "mysql",
  /**
   * Configures the connection pool settings for the MySQL database connection.
   * These settings control the maximum and minimum number of connections in the pool,
   * as well as the maximum time to acquire a connection and the maximum time a
   * connection can remain idle before being closed.
   */
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;