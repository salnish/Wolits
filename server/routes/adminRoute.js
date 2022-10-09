const express = require("express");
const router = express.Router();
const {
  restaurantByStatus,
  restaurantDetails,
  updateOnboard
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMIddleware");

router.get("/getRestaurants/:status", protectAdmin, restaurantByStatus);
router.get("/restaurantDetails/:restaurantId", protectAdmin, restaurantDetails);
router.put('/updateOnboard',protectAdmin,updateOnboard)

module.exports = router;
