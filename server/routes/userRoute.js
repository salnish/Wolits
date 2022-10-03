const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const {
  sentOtp,
  verifyNumber,
  registerUser,
  loginUser,
  isUser,
  updateLocation
} = require("../controllers/userController");
const { signupTimeOut, protect ,refreshAccessToken } = require("../middleware/authMIddleware");

router.post("/", loginUser);
router.get("/isUser", protect, isUser);
router.post("/verifyNumber", sentOtp);
router.put("/verifyOtp", signupTimeOut, verifyNumber);
router.put("/register", signupTimeOut, registerUser);
router.put("/updateLocation",protect,updateLocation);
router.post('/refresh',refreshAccessToken)

module.exports = router;
