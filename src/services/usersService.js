const usersDao = require("../dao/usersDao");
const logger = require("../util/logger");
const { expect } = require("chai");

const usersService = {
  validate: (email, first_name, last_name, active, callback) => {
    try {
      expect(email).to.be.a("string", "Email schould be a string");
      expect(first_name).to.be.a("string", "FirstName schould be a string");
      expect(last_name).to.be.a("string", "LastName schould be a string");
      expect(active).to.be.a("number", "Active schould be a number");
      callback(undefined);
    } catch (err) {
      callback(err);
    }
  },
  get: (userId, callback) => {
    usersDao.get(userId, (error, users) => {
      if (error) return callback(error, undefined);
      if (users) {
        logger.debug(users);
        return callback(undefined, users);
      }
    });
  },
  update: (userId, first_name, last_name, email, active, callback) => {
    usersDao.update(
      userId,
      first_name,
      last_name,
      email,
      active,
      (error, result) => {
        if (error) return callback(error, undefined);
        return callback(undefined, result);
      }
    );
  },

  delete: (userId, callback) => {
    usersDao.delete(userId, (error, success) => {
      if (error) return callback(error, undefined);
      if (success) return callback(undefined, true);
      return callback(undefined, false);
    });
  },
};

module.exports = usersService;
