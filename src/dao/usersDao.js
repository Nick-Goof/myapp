const data = require("../db/sql/example.data");
const database = require("../db/sql/connection");

const usersDao = {
  get: (userId, callback) => {
    database.query(
      userId == undefined
        ? `SELECT * FROM ??`
        : `SELECT * FROM ?? WHERE ?? = ?`,
      userId == undefined ? [`customer`] : [`customer`, `customer_id`, userId],
      (error, results) => {
        if (error) return callback(error, undefined);
        if (results) return callback(undefined, results);
      }
    );
  },
  update: (userId, email, callback) => {
    database.query(
      "UPDATE ?? SET ?? = ? WHERE ?? = ?",
      ["customer", "email", email, "customer_id", userId],
      (error, results) => {
        if (error) return callback(error, undefined);
        if (results.affectedRows > 0) return callback(undefined, true);
        return callback(undefined, false);
      }
    );
  },
  delete: (userId, callback) => {},
};

module.exports = usersDao;
