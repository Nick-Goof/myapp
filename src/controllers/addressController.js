const addressService = require("../services/addressService");

const logger = require("../util/logger");

const addressController = {
  get: (req, res, next) => {
    let addressId = req.params.addressId;
    addressService.get(addressId, (error, addresses) => {
      if (error) return next(error);
      if (addresses) {
        addressId == undefined
          ? res.render("address/table", { addresses: addresses })
          : res.render("address/details", { address: addresses[0] });
      }
    });
  },
  update: (req, res, next) => {
    let addressId = req.params.addressId;
    let { street, city, postal_code } = req.body;

    if (req.method === "GET") {
      addressService.get(addressId, (error, addresses) => {
        if (error) return next(error);
        if (addresses)
          return res.render("address/edit", { address: addresses[0] });
      });
    } else {
      addressService.update(
        addressId,
        street,
        city,
        postal_code,
        (error, result) => {
          if (error) return next(error);
          if (result) {
            return res.redirect(`/address/${addressId}/details`);
          } else {
            return res.status(400).send("Update failed");
          }
        }
      );
    }
  },
  delete: (req, res, next) => {
    let addressId = req.params.addressId;
    addressService.delete(addressId, (error, success) => {
      if (error) return next(error);
      if (success) return res.status(200).send(`Address ${addressId} deleted`);
      return res.status(404).send(`Address ${addressId} not found`);
    });
  },
};

module.exports = addressController;
