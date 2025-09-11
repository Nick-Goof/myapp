const database = require("../db/sql/connection");

const rentalService = {
  getByCustomerId: (customerId, callback) => {
    database.query(
      "SELECT * FROM rental WHERE customer_id = ?",
      [customerId],
      (err, results) => {
        if (err) return callback(err);
        callback(undefined, results);
      }
    );
  },
};

module.exports = rentalService;
