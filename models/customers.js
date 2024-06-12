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
};

export default customers;
