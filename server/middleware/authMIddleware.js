const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Partner = require("../models/partnerModel");
const { generateToken,verifyToken } = require("../utils/jwt");

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

        res.status(401);
        throw new Error("Timeout");
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

const partnerTimeOut = asyncHandler(async (req, res, next) => {
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
      req.user = await Partner.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error.message == "jwt expired") {

        res.status(401);
        throw new Error("Timeout");
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

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { refreshToken } = req.body;
  let token;
  if (refreshToken) {
    try {
      //Get token from header
      token = refreshToken;

      //Verify token
      const decoded = verifyToken(token);

      //Get user from the token
      let user = await User.findById(decoded.id).select("-password");

      if (user) {
        res.status(200).json({
          refresh: true,
          token: generateToken(user.id, 30),
          refreshToken: generateToken(user.id, 60),
        });
      }
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorised");
    }
  }
});

const protect = asyncHandler(async (req, res, next) => {
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
        res.status(401);
        throw new Error(error.message);
      } else {
        console.log(error.message);
        res.status(401);
        throw new Error("Not authorised");
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

const partnerProtect = asyncHandler(async (req, res, next) => {
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
      req.partner = await Partner.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error.message == "jwt expired") {
        res.status(401);
        throw new Error(error.message);
      } else {
        console.log(error.message);
        res.status(401);
        throw new Error("Not authorised");
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
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
      const admin = await Partner.findOne({_id: decoded.id}).select("-password");
      if(admin.isAdmin){
        req.admin=admin
      }else{
        res.status(400);
        throw new Error('Not authorised')
      }

      next();
    } catch (error) {
      console.log(error)
      if (error.message == "jwt expired") {
        res.status(401);
        throw new Error(error.message);
      } else {
        res.status(401);
        throw new Error("Not authorised");
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});


module.exports = {
  signupTimeOut,
  partnerTimeOut,
  protect,
  refreshAccessToken,
  partnerProtect,
  protectAdmin,
};
