import db from "../config/db.js";

/**
 * Provides functions for interacting with the customers table in the database.
 */
const customers = {
  /**
   * Retrieves all customers from the database.
   * @returns {Promise<any[]>} - An array of customer objects.
   */
  findAll: () => {
    let sql = "SELECT * FROM customers;";
    return db.execute(sql);
  },

  /**
   * Retrieves a customer from the database by their ID.
   * @param {number} id - The ID of the customer to retrieve.
   * @returns {Promise<any>} - The customer object.
   */
  findById: (id) => {
    let sql = `SELECT * FROM customers WHERE id = ${id};`;
    return db.execute(sql);
  },

  /**
   * Retrieves a customer from the database by their email address.
   * @param {string} email - The email address of the customer to retrieve.
   * @returns {Promise<any>} - The customer object.
   */
  findByEmail: (email) => {
    let sql = `SELECT * FROM customers WHERE email = '${email}';`;
    return db.execute(sql);
  },

  /**
   * Creates a new customer in the database.
   * @param {object} customer - An object containing the customer's first name, email, and last name.
   * @returns {Promise<any>} - The newly created customer object.
   */
  createNewCustomer: (customer) => {
    let sql = `INSERT INTO customers (first_name, email, last_name) VALUES ('${customer.first_name}', '${customer.email}', '${customer.last_name}');`;
    return db.execute(sql);
  },

  /**
   * Deletes a customer from the database by their ID.
   * @param {number} id - The ID of the customer to delete.
   * @returns {Promise<any>} - The deleted customer object.
   */
  deleteCustomer: (id) => {
    let sql = `DELETE FROM customers WHERE id = ${id};`;
    return db.execute(sql);
  },
};

export default customers;
