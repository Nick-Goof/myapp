var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

/* GET users listing. */
router.get("/", usersController.get);
router.get("/:userId", usersController.get);
router.get("/:userId/details", usersController.get);
//update
router.get("/:userId/edit", usersController.update);
router.post("/:userId/edit", usersController.validate, usersController.update);

router.post("/delete/:userId", usersController.delete);

module.exports = router;
