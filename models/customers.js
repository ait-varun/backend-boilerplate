import db from "../config/db.js";

class Customers {
  constructor(title, body) {
    // this.title = title;
    // this.body = body;
  }

  static findAll() {
    let sql = "SELECT * FROM customers;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM customers WHERE id = ${id};`;

    return db.execute(sql);
  }
}

export default Customers;
