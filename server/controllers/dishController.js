const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Dish = require("../models/dishModel");
const cloudinaryUploadImg = require("../utils/cloudinary");

//@Desc Create new dish document
//Access protected
const addDish = asyncHandler(async (req, res) => {
  try {
    //create partner and restaurant details  object
    let partnerData = {
      partnerId: mongoose.Types.ObjectId(req.partner.id),
      restaurantId: req.partner.restaurentId,
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

//@Desc get all dishes of Specific partner
//Route GET api/partner/getdishes
//Access protected
const getDishes = asyncHandler(async (req, res) => {
  try {
    const partnerId = mongoose.Types.ObjectId(req.partner.id);

    const dishData = await Dish.find({ partnerId: partnerId });

    res.status(200).json(dishData);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("no dishes found");
  }
});

//@Desc get all dishes by restaurentId
const findDishesbyRestaurantId = async (restaurantId) => {
  try {
    const dishData = await Dish.find({ restaurantId });
    return dishData;
  } catch (error) {
    return error;
  }
};

//@Desc get all dishes by partnerId
const findDishesbyPartnerId = async (partnerId) => {
    try {
      const dishData = await Dish.find({ partnerId });
      return dishData;
    } catch (error) {
      return error;
    }
  };



  //@Desc get dish by Id
const findDishbyId = async (dishId) => {
    try {
      const dishData = await Dish.findById({ dishId });
      return dishData;
    } catch (error) {
      return error;
    }
  };
