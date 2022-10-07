const express = require("express");
const router = express.Router();
const { restaurantByStatus } = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMIddleware");

router.get("/getRestaurants/:status", protectAdmin, restaurantByStatus);

module.exports = router;
