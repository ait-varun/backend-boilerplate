/**
 * Defines the Customer model for the database.
 *
 * The Customer model has the following fields:
 * - `id`: an auto-incrementing primary key integer
 * - `first_name`: a required string field
 * - `last_name`: a required string field
 * - `email`: a required and unique string field
 *
 * The model is mapped to the `customers` table in the database.
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "customers",
    timestamps: false,
  }
);

export default Customer;
