const usersDao = require("../dao/usersDao");
const logger = require("../util/logger");

const usersService = {
  get: (userId, callback) => {
    usersDao.get(userId, (error, users) => {
      if (error) return callback(error, undefined);
      if (users) {
        logger.debug(users);
        return callback(undefined, users);
      }
    });
  },
  update: (userId, email, callback) => {
    usersDao.update(userId, email, (error, result) => {
      if (error) return callback(error, undefined);
      return callback(undefined, result);
    });
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
