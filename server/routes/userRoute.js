const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const {
  sentOtp,
  verifyNumber,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const { signupTimeOut } = require("../middleware/authMIddleware");

router.get("/", loginUser);
router.post("/verifyNumber", sentOtp);
router.put("/verifyOtp", signupTimeOut, verifyNumber);
router.put("/register", signupTimeOut, registerUser);

module.exports = router;
