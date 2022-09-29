const mongoose = require('mongoose');


const connectDB = async ()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI)    
        console.log(`MongoDB connected:${connect.connection.host}`.cyan.underline)
    }catch{
        console.log(`MongoDb not connected ${error}`.red)
    }
}
module.exports=connectDB