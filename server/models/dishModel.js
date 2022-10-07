const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurant",
        require:true,
        unique:true
    },
   partnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"partner",
        require:true,
        unique:true
    },
    dishName:{
        type:String
    },
    veg:{
        type:Boolean
    },
    category:{
        type:String,    
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    discription:{
        type:String
    }
},
{
    timestamps:true
})

const dishModel = mongoose.model('dish',dishSchema);
module.exports =dishModel;