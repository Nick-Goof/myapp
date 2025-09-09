const usersService = require("../services/usersService");
const logger = require("../util/logger");
const usersController = {
  get: (req, res, next) => {
    let userId = req.params.userId;
    usersService.get(userId, (error, users) => {
      if (error) next(error);
      if (users) {
        userId == undefined
          ? res.render("users/table", { users: users })
          : res.render("users/details", { users: users[0] });
      }
    });
  },

  update: (req, res, next) => {
    let userId = req.params.userId;
    let { email } = req.body;

    if (req.method === "GET") {
      usersService.get(userId, (error, users) => {
        if (error) return next(error);
        if (users) return res.render("users/edit", { users: users[0] });
      });
    } else {
      usersService.update(userId, email, (error, result) => {
        if (error) return next(error);
        if (result) {
          return res.redirect(`/users/${userId}/details`);
        } else {
          return res.status(400).send("Update failed");
        }
      });
    }
  },

  delete: (req, res, next) => {
    let userId = req.params.userId;
    usersService.delete(userId, (error, success) => {
      if (error) return next(error);
      if (success) return res.status(200).send(`User ${userId} deleted`);
      return res.status(404).send(`User ${userId} not found`);
    });
  },
};

module.exports = usersController;
