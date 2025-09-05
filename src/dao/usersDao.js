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

  delete: (userId, callback) => {
    const index = data.findIndex((user) => user.id == userId);
    if (index !== -1) {
      data.splice(index, 1);
      return callback(undefined, true);
    } else {
      return callback(undefined, false);
    }
  },
};

module.exports = usersDao;
