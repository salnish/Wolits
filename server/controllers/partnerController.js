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
  const { phone, password } = req.body;

  //check for user phone
  const user = await Partner.findOne({ phone });
  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      token: generateToken(user.id, 60*60 ),
      refreshtoken: generateToken(user.id, 60*60*24 ),
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
});


const postApplication= asyncHandler(async(req,res)=>{
  let id = mongoose.Types.ObjectId(req.partner.id);
  if(req.body){
    console.log(req.body.fssaiFile)
    res.status(200).json({
      name:'updated',
      status:true
    })
  }else{
    res.status(400)
    throw new Error('error')
  }
  
})

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
    postApplication

};
