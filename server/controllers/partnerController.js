const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Partner = require("../models/partnerModel");
const Restaurant = require("../models/restaurantModel");
const { sendSms, verifyOtp } = require("./twillioController");
const cloudinaryUploadImg = require("../utils/cloudinary");

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
          token: generateToken(partner.id, 60 * 5),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
        throw new Error("otp sending Failed");
      });
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
      id: user.id,
      isVerified: true,
      token: generateToken(user.id, 60 * 5),
    });
  } else {
    verifyOtp(user.phone, otp).then(async (checkStatus) => {
      await Partner.findByIdAndUpdate({ _id: user.id }, { isVerified: true })
        .then((d) => {
          console.log(d);
          res.status(201).json({
            id: user.id,
            isVerified: true,
            token: generateToken(user.id, 60 * 60),
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
const registerPartner = asyncHandler(async (req, res) => {
  let id = mongoose.Types.ObjectId(req.user.id);
  const { name, email, password } = req.body;

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await Partner.findByIdAndUpdate(
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
        id: user.id,
        name: name,
        token: generateToken(user.id, 60 * 5),
        refreshtoken: generateToken(user.id, 60 * 60 * 24),
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
const loginPartner = asyncHandler(async (req, res) => {
  try {
    const { phone, password } = req.body;

    //check for user phone
    const partner = await Partner.findOne({ phone });
    await bcrypt.compare(password, partner.password);

    if (partner.isAdmin) {
      res.json({
        _id: partner.id,
        token: generateToken(partner.id, 60 * 60),
        refreshtoken: generateToken(partner.id, 60 * 60 * 24),
        isAdmin: partner.isAdmin,
      });
    } else {
      res.json({
        _id: partner.id,
        token: generateToken(partner.id, 60 * 60),
        refreshtoken: generateToken(partner.id, 60 * 60 * 24),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("invalid Credentials");
  }
});

const postApplication = asyncHandler(async (req, res) => {
  console.log(req.files);
  console.log(req.body);

  try {
    let id = mongoose.Types.ObjectId(req.partner.id);
    const fssaiFile = req.files.fssaiFile[0].path;
    const pancardFile = req.files.pancardFile[0].path;
    const passbookFile = req.files.passbookFile[0].path;
    const iconFile = req.files.iconFile[0].path;
    const image1 = await cloudinaryUploadImg(fssaiFile);
    const image2 = await cloudinaryUploadImg(pancardFile);
    const image3 = await cloudinaryUploadImg(passbookFile);
    const image4 = await cloudinaryUploadImg(iconFile);
    let data = {
      partnerId: id,
      fssaiFile: image1.url,
      pancardFile: image2.url,
      passbookFile: image3.url,
      iconFile: image4.url,
    };
    const RestaurantData = { ...req.body, ...data };
    console.log("dfkjdsfjkh");
    const restaurent = await Restaurant.create(RestaurantData);
    console.log("dfjkhdsahkjfdas");
    await Partner.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          restaurentId: restaurent.id,
          restaurentName: restaurent.restaurantName,
        },
      }
    );

    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("update failed");
  }
});

//@Desc GET Restaurant
//Route GET api/partner/getForm
//Access Protected
const restaurantDetails = asyncHandler(async (req, res) => {
  try {
    let id = mongoose.Types.ObjectId(req.partner.id);
    const restaurant = await Restaurant.findOne({ partnerId: id });
    console.log(restaurant);
    res.status(200).json({
      restaurantData: restaurant,
      status: restaurant.status,
    });
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error(error);
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
  verifyNumber,
  registerPartner,
  loginPartner,
  postApplication,
  restaurantDetails,
};
