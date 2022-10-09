const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const { sendSms, verifyOtp } = require("./twillioController");
const { generateToken } = require("../utils/jwt");

//@Desc Sent Otp forverify phone number
//@Route POST /api/user/verifyNumber
//@Access Public
const sentOtp = asyncHandler(async (req, res) => {
  console.log(req.body.phone);
  const { phone } = req.body;
  if (!phone) {
    res.status(400);
    throw new Error("please add valid phone Number");
  }

  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error("user already Exists !");
  }

  const user = await User.create({
    phone,
  });

  if (user) {
    sendSms(phone)
      .then((verification) => {
        res.status(201).json({
          status: "OTP Send",
          token: generateToken(user.id, '60s'),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
        throw new Error("otp sending Failed");
      });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@Desc verify phone number
//@Route PUT /api/user/verifyOtp
//@Access Protected
const verifyNumber = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  let user = req.user;
  let id = mongoose.Types.ObjectId(req.user.id);
  console.log(req.user);
  if (user.isVerified) {
    res.status(201).json({
      isVerified: true,
      token: generateToken(user.id, '5m'),
    });
  } else {
    verifyOtp(user.phone, otp).then(async (checkStatus) => {
      await User.findByIdAndUpdate({ _id: user.id }, { isVerified: true })
        .then((d) => {
          console.log(d);
          res.status(201).json({
            id: user.id,
            isVerified: true,
            token: generateToken(user.id,'5m'),
          });
        })
        .catch((err) => {
          res.status(400);
          throw new Error("otp verification failed");
        });
    });
  }
});

//@Desc register the user
//@Route PUT api/user/register
//@access protected
const registerUser = asyncHandler(async (req, res) => {
  let id = mongoose.Types.ObjectId(req.user.id);
  const { name, email, password } = req.body;

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
        email: email,
        isRegistered: true,
        password: hashedPassword,
      },
    }
  )
    .then((user) => {
      console.log(user);
      res.status(200).json({
        name: name,
        token: generateToken(user.id, '1h'),
        refreshToken: generateToken(user.id, '2h'),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      throw new Error("register failed");
    });
});

//@Desc authenticate the user
//@Route GET api/user/
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  //check for user phone
  const user = await User.findOne({ phone });
  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      name: user.name,
      token: generateToken(user.id, '1h'),
      refreshToken: generateToken(user.id, '2h'),
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
});

//@Desc update current location
//@Route PUT api/user/updateLocation
//@access Protected
const updateLocation = asyncHandler(async (req, res) => {
  const { location } = req.body;
  let id = mongoose.Types.ObjectId(req.user.id);
  await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        currentLocation: location,
      },
    }
  )
    .then((data) => {
      res.status(200).json({
        id: id,
        updated: true,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
      throw new Error("not updated");
    });
});

//@Desc check the user
//@Route GET api/user/isUser
//@access protected
const isUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      userExists: true,
    });
  } else {
    res.status(400);
    throw new Error("UnAuthorised Entry");
  }
});

module.exports = {
  sentOtp,
  verifyNumber,
  registerUser,
  loginUser,
  isUser,
  updateLocation,
};
