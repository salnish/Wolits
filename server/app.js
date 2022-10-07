const express = require("express");
const dotenv = require("dotenv").config()
const port=process.env.PORT ||5000;
const connectDB= require('./config/dB')
const colors = require("colors");
const cors = require("cors");
const {errorHandler} = require("./middleware/errorMiddleware")
const morgan = require("morgan");

//importing the Routers
const userRouter =require('./routes/userRoute');
const partnerRouter =require('./routes/partnerRoute')
const adminRouter = require('./routes/adminRoute')

//connecting the MongoDB Database
connectDB();

const app = express();
app.use(cors());//used to protect the origin 
app.use(morgan('dev'));//used to log the request and response 

app.use(express.json());// used to parse the incoming requests with JSON payloads
app.use(express.urlencoded({extended:false}))//this method is to parse the incoming request with urlencoded payloads and is based upon the body-parser.

app.use('/api/user',userRouter);
app.use('/api/partner',partnerRouter)
app.use('/api/admin',adminRouter)




app.use(errorHandler);//Error Handling middleWare
app.listen(port,()=>console.log(`Server started on port ${port}`.yellow))
