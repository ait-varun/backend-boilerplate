import db from "../config/db.js";

const customers = {
  findAll: () => {
    let sql = "SELECT * FROM customers;";
    return db.execute(sql);
  },

  findById: (id) => {
    let sql = `SELECT * FROM customers WHERE id = ${id};`;
    return db.execute(sql);
  },

  createNewCustomer: (customer) => {
    let sql = `INSERT INTO customers (first_name, email, last_name) VALUES ('${customer.first_name}', '${customer.email}', '${customer.last_name}');`;
    return db.execute(sql);
  },

  deleteCustomer: (id) => {
    let sql = `DELETE FROM customers WHERE id = ${id};`;
    return db.execute(sql);
  },
};

export default customers;
