const usersService = require("../services/usersService");
const usersController = {
  get: (req, res, next) => {
    let userId = req.params.userId;
    usersService.get(userId, (error, users) => {
      if (error) next(error);
      if (users) res.render("users", { users: users });
    });
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
