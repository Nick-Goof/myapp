const usersService = require("../services/usersService");
const addressService = require("../services/addressService");
const rentalService = require("../services/rentalService");

const logger = require("../util/logger");
const usersController = {
  validate: (req, res, next) => {
    let userId = req.params.userId;
    let { email, first_name, last_name, active } = req.body;
    active = parseInt(active);
    usersService.validate(email, first_name, last_name, active, (error) => {
      if (error) next(error);
      next();
    });
  },

  get: (req, res, next) => {
    let userId = req.params.userId;
    usersService.get(userId, (error, users) => {
      if (error) return next(error);
      if (users) {
        if (userId == undefined) {
          res.render("users/table", { users: users });
        } else {
          const user = users[0];
          addressService.get(user.address_id, (err, addresses) => {
            if (err) return next(err);
            // Rentals ophalen
            rentalService.getByCustomerId(userId, (err2, rentals) => {
              if (err2) return next(err2);
              res.render("users/details", {
                users: user,
                address: addresses && addresses[0] ? addresses[0] : null,
                rentals: rentals || [],
              });
            });
          });
        }
      }
    });
  },

  update: (req, res, next) => {
    let userId = req.params.userId;
    let { first_name, last_name, email, active } = req.body;

    active = active ? 1 : 0;

    if (req.method === "GET") {
      usersService.get(userId, (error, users) => {
        if (error) return next(error);
        if (users) return res.render("users/edit", { users: users[0] });
      });
    } else {
      usersService.update(
        userId,
        first_name,
        last_name,
        email,
        active,
        (error, result) => {
          if (error) return next(error);
          if (result) {
            return res.redirect(`/users/${userId}/details`);
          } else {
            return res.status(400).send("Update failed");
          }
        }
      );
    }
  },

  delete: (req, res, next) => {
    let userId = req.params.userId;
    usersService.delete(userId, (error, success) => {
      if (error) return next(error);
      if (success) {
        return res.redirect("/users");
      }
      res.status(404).send("Gebruiker niet gevonden");
    });
  },
};

module.exports = usersController;
