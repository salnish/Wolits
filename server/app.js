const express = require("express");
const dotenv = require("dotenv").config()
const port=process.env.PORT ||5000;
const connectDB= require('./config/dB')
const colors = require("colors");
const cors = require("cors");
const {errorHandler} = require("./middleware/errorMiddleware")
const morgan = require("morgan");

const userRouter =require('./routes/userRoute');

connectDB();

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/user',userRouter);




app.use(errorHandler);
app.listen(port,()=>console.log(`Server started on port ${port}`.yellow))
