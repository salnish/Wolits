const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:Number,
        required:[true,'Please add a phone number'],
        unique:true
    },
    password:{
        type:String
    },
    currentLocation:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isRegistered:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const userModel = mongoose.model('user',userSchema)
module.exports= userModel
