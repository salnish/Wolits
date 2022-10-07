const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Partner = require("../models/partnerModel");
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const cloudinaryUploadImg = require("../utils/cloudinary");

//@Desc update onboard status of restaurant
//Route PUT api/admin/updateOnboard
//Access protected
const updateOnboard = asyncHandler(async (req, res) => {
  try {
    const { formId, status } = req.body;

    await Restaurant.findByIdAndUpdate({ _id: formId }, { status: status });
    res.status(200).json({
      id: formId,
      updated: true,
    });
  } catch (error) {
    res.status(400);
    throw new Error("No details found");
  }
});

//@Desc get Restaurant details of by status
//Route GET api/admin/getRestaurants/:status
//Access protected
const restaurantByStatus = asyncHandler(async (req, res) => {
  try {
    const status = req.params.status;
    console.log(status);
    const approvedRestaurants = await Restaurant.find({ status: status });
    console.log(approvedRestaurants);
    res.status(200).json(approvedRestaurants);
  } catch (error) {
    res.status(400);
    throw new Error("No details found");
  }
});

//@Desc get details of restaurant by id
//Route GET api/admin//restaurantDetails/:restaurantId
//Access protected
const restaurantDetails = asyncHandler(async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById({_id:restaurantId});
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400);
    throw new Error("No Data found");
  }
});

module.exports = {
  restaurantByStatus,
  restaurantDetails,
};
