import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("bodyandfragrance-app", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
