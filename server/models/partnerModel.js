const mongoose =require("mongoose");

const partnerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:Number,
        required:[true,'please add phone number'],
        unique:true
    },
    password:{
        type:String
    },
    restaurentId:{
        type:String,
        unique:true
    },
    restaurentName:{
        type:String,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isRegistered:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean
    }
},{
    timestamps:true
})
const partnerModel = mongoose.model('partner',partnerSchema);
module.exports = partnerModel;