const addressDao = require("../dao/addressDao");
const logger = require("../util/logger");

const addressService = {
  get: (addressId, callback) => {
    addressDao.get(addressId, (error, addresses) => {
      if (error) return callback(error, undefined);
      if (addresses) {
        logger.debug(addresses);
        return callback(undefined, addresses);
      }
    });
  },
  update: (addressId, street, city, postal_code, callback) => {
    addressDao.update(addressId, street, city, postal_code, (error, result) => {
      if (error) return callback(error, undefined);
      return callback(undefined, result);
    });
  },
  delete: (addressId, callback) => {
    addressDao.delete(addressId, (error, success) => {
      if (error) return callback(error, undefined);
      if (success) return callback(undefined, true);
      return callback(undefined, false);
    });
  },
};

module.exports = addressService;
