const express = require("express");
const router = express.Router();
const {
  restaurantByStatus,
  restaurantDetails,
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMIddleware");

router.get("/getRestaurants/:status", protectAdmin, restaurantByStatus);
router.get("/restaurantDetails/:restaurantId", protectAdmin, restaurantDetails);

module.exports = router;
