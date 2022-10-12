const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Partner = require("../models/partnerModel");
const Restaurant = require("../models/restaurantModel");
const Dish = require("../models/dishModel");
const { sendSms, verifyOtp } = require("./twillioController");
const cloudinaryUploadImg = require("../utils/cloudinary");
const { generateToken } = require("../utils/jwt");

//@Desc sent OTP for verify phone number
//@Route POST /api/partner/verifyNumber
//@Access Public
const sentOtp = asyncHandler(async (req, res) => {
  try {
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
    console.log("jfjfjjjdjd");
    const partner = await Partner.create({
      phone,
    });
    console.log("djhdkjhdkhj");

    // if (partner) {
    //   sendSms(phone)
    //     .then((verification) => {
    //       console.log(verification);
    //       res.status(201).json({
    //         id: partner.id,
    //         otpSend: true,
    //         token: generateToken(partner.id, "5m"),
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       res.status(400);
    //       throw new Error("otp sending Failed");
    //     });

    // }
    res.status(201).json({
      id: partner.id,
      otpSend: true,
      token: generateToken(partner.id, "5m"),
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

//@Desc verify phone number
//@Route PUT /api/user/verifyOtp
//@Access Protected
const verifyNumber = asyncHandler(async (req, res) => {
  try {
    const { otp } = req.body;
    let user = req.user;
    let id = mongoose.Types.ObjectId(req.user.id);
    console.log(req.user);
    if (user.isVerified) {
      res.status(201).json({
        id: user.id,
        isVerified: true,
        token: generateToken(user.id, "5m"),
      });
    } else {
      // verifyOtp(user.phone, otp).then(async (checkStatus) => {
      //   await Partner.findByIdAndUpdate({ _id: user.id }, { isVerified: true })
      //     .then((d) => {
      //       console.log(d);
      //       res.status(201).json({
      //         id: user.id,
      //         isVerified: true,
      //         token: generateToken(user.id, "5m"),
      //       });
      //     })
      //     .catch((err) => {
      //       res.status(400);
      //       throw new Error("Update failed");
      //     });
      // }).catch(()=>{
      //   res.status(400);
      //   throw new Error("Otp verification failed");
      // })

      //on Develop
      await Partner.findByIdAndUpdate({ _id: user.id }, { isVerified: true })
        .then((d) => {
          console.log(d);
          res.status(201).json({
            id: user.id,
            isVerified: true,
            token: generateToken(user.id, "5m"),
          });
        })
        .catch((err) => {
          res.status(400);
          throw new Error("Update failed");
        });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
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
    .then((partner) => {
      console.log(partner);
      res.status(200).json({
        id: partner.id,
        token: generateToken(partner.id, "1h"),
        refreshToken: generateToken(partner.id, "2h"),
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
    if (!partner) {
      throw new Error("User not registered! please signup");
    }
    const match = await bcrypt.compare(password, partner.password);
    if (!match) {
      throw new Error("Incorrect password");
    }

    if (partner.isAdmin) {
      res.json({
        id: partner.id,
        token: generateToken(partner.id, "1h"),
        refreshToken: generateToken(partner.id, "2h"),
        isAdmin: partner.isAdmin,
      });
    } else {
      res.json({
        name: partner.name,
        token: generateToken(partner.id, "1h"),
        refreshToken: generateToken(partner.id, "2h"),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

//@Desc post application for onboard restaurent
//Route POST api/partner/applyForm
//Access protected
const postApplication = asyncHandler(async (req, res) => {
  try {
    let id = mongoose.Types.ObjectId(req.partner.id);

    //upload the files to cloudinary an get the url
    const fssaiFile = await cloudinaryUploadImg(req.files.fssaiFile[0].path);
    const pancardFile = await cloudinaryUploadImg(
      req.files.pancardFile[0].path
    );
    const passbookFile = await cloudinaryUploadImg(
      req.files.passbookFile[0].path
    );
    const iconFile = await cloudinaryUploadImg(req.files.iconFile[0].path);

    //create an object to add with req.body
    let data = {
      partnerId: id,
      fssaiFile: fssaiFile.url,
      pancardFile: pancardFile.url,
      passbookFile: passbookFile.url,
      iconFile: iconFile.url,
    };
    //combine the image url and partner id with req.body
    const RestaurantData = { ...req.body, ...data };

    //create restaurant document for the respected partner
    const restaurent = await Restaurant.create(RestaurantData);

    //update the partner document with restaurant details
    await Partner.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          restaurentId: restaurent.id,
          restaurentName: restaurent.restaurantName,
        },
      }
    );

    //response create status
    res.status(201).json({
      status: true,
    });
  } catch (error) {
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

    //find restaurant that matches the partner
    const restaurant = await Restaurant.findOne({ partnerId: id });
    if (restaurant) {
      res.status(200).json({
        restaurantData: restaurant,
        status: restaurant.status,
      });
    } else {
      res.status(400);
      throw new Error("Not Onboarded");
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error(error);
  }
});

//@Desc Create new dish document
//Access protected
const addDish = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    //upload the files to cloudinary an get the url
    const image = await cloudinaryUploadImg(req.file.path);
    //create partner and restaurant details  object
    let partnerData = {
      partnerId: mongoose.Types.ObjectId(req.partner.id),
      restaurantId: req.partner.restaurentId,
      image: image.url,
    };

    //combine the partner details and dish details all together
    const dishData = { ...req.body, ...partnerData };

    //Create new Dish document
    await Dish.create(dishData).then((dish) => {
      res.status(201).json({
        id: dish.id,
        created: true,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Adding dish failed");
  }
});

//@Desc Get dishes by pagination
//Route GET api/partner/getDishes
//Access protected
const getDishes = asyncHandler(async (req, res) => {
  try {
    const { page, limit } = req.params;
    const dishes = await Dish.find()
      .limit(limit)
      .skip((page - 1) * limit);

    const total =await Dish.count()
    console.log(total);
    res.status(200).json({
      total:total,
      dishes:dishes
    });
    console.log(req.params);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  sentOtp,
  verifyNumber,
  registerPartner,
  loginPartner,
  postApplication,
  restaurantDetails,
  addDish,
  getDishes,
};
