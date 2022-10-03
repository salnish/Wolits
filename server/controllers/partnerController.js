const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Partner = require("../models/partnerModel");
const { sendSms, verifyOtp } = require("./twillioController");

//@Desc sent OTP for verify phone number
//@Route POST /api/partner/verifyNumber
//@Access Public
const sentOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(400);
    throw new Error("please add valid phone Number");
  }

  const partnerExists = await Partner.findOne({ phone });
  if (partnerExists) {
    res.status(400);
    throw new Error("user already Exists !");
  }

  const partner = await Partner.create({
    phone,
  });

  if (partner) {
    sendSms(phone)
    .then((verification) => {
      console.log(verification);
      res.status(201).json({
        id: partner.id,
        otpSend: true,
        token: generateToken(user.id, 60 * 5),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      throw new Error("otp sending Failed");
    });
  }
});

//Generate Jwt
const generateToken = (id, time) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};

module.exports = {
    sentOtp,
};
