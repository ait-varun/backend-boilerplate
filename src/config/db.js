// Load environment variables from a file
process.loadEnvFile();
import { Sequelize } from "sequelize";

const userName = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, userName, password, {
  host: host,
  dialect: "mysql",
});

export default sequelize;