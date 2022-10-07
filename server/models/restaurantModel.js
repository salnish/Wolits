const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    partnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"partner",
        require:true,
        unique:true
    },
    restaurantName:{
        type:String
    },
    restaurantLocality:{
        type:String
    },
    locationLongitude:{
        type:String
    },
    locationLatitude:{
        type:String
    },
    contactNumber:{
        type:String
    },
    address:{
        type:String
    },
    ownerName:{
        type:String
    },
    ownerEmail:{
        type:String
    },
    restaurantType:{
        type:String
    },
    cuisineType:{
        type:String
    },
    openingTime:{
        type:String
    },
    closingTime:{
        type:String
    },
    bankAccountNo:{
        type:String
    },
    gstNo:{
        type:String
    },
    fssaiFile:{
        type:String
    },
    pancardFile:{
        type:String
    },
    passbookFile:{
        type:String
    },
    iconFile:{
        type:String
    },
    status:{
        type:String,
        default:'pending'
    }
    
},{
    timestamps:true
})

const restaurantModel = mongoose.model('restaurant',restaurantSchema);
module.exports = restaurantModel;