const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const signupTimeOut = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error.message == "jwt expired") {
        console.log("hhhhhhhhhhhhhhhhhh")
        res.status(200).json({
          tokenExpired: true,
        });
      } else {
        console.log(error.message);
        res.status(401);
        throw new Error(error.message);
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

module.exports = { signupTimeOut };
