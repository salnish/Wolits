const jwt = require("jsonwebtoken");



//Generate Jwt
const generateToken = (id, time) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: time,
    });
  };

  //decode the token 
  const verifyToken=(token)=>{
    return jwt.verify(token, process.env.JWT_SECRET);
  }
//exports the functions
  module.exports={
    generateToken,
    verifyToken
  }