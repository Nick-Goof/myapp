const database = require("../db/sql/connection");

const addressDao = {
  get: (addressId, callback) => {
    database.query(
      addressId == undefined
        ? `SELECT * FROM ??`
        : `SELECT * FROM ?? WHERE ?? = ?`,
      addressId == undefined
        ? ["address"]
        : ["address", "address_id", addressId],
      (error, results) => {
        if (error) return callback(error, undefined);
        return callback(undefined, results);
      }
    );
  },
  update: (addressId, street, city, postal_code, callback) => {
    database.query(
      "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?",
      [
        "address",
        "street",
        street,
        "city",
        city,
        "postal_code",
        postal_code,
        "address_id",
        addressId,
      ],
      (error, results) => {
        if (error) return callback(error, undefined);
        if (results.affectedRows > 0) return callback(undefined, true);
        return callback(undefined, false);
      }
    );
  },
  delete: (addressId, callback) => {
    database.query(
      "DELETE FROM ?? WHERE ?? = ?",
      ["address", "address_id", addressId],
      (error, results) => {
        if (error) return callback(error, undefined);
        if (results.affectedRows > 0) return callback(undefined, true);
        return callback(undefined, false);
      }
    );
  },
};

module.exports = addressDao;
