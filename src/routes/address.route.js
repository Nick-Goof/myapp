var express = require("express");
var router = express.Router();

const addressController = require("../controllers/addressController");

/* GET address listing. */
router.get("/", addressController.get);
router.get("/:addressId", addressController.get);
router.get("/:addressId/details", addressController.get);

// Update
router.get("/:addressId/edit", addressController.update);
router.post("/:addressId/edit", addressController.update);

// Delete
router.delete("/:addressId", addressController.delete);

module.exports = router;
