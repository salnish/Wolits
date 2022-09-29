require("dotenv").config({ path: "../.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken) 

const sendOtp = (Mobilenumber) =>
  new Promise(async(resolve, reject) => {

    await client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({ to: `+91${Mobilenumber}`, channel: "sms" }).then((verification)=>{
            resolve(verification)
        }).catch((error)=>{
            reject(error)
        })
  });

const verifyOtp = (Mobilenumber, otp) =>
  new Promise(async (resolve, reject) => {
    console.log("kgtydfgc");
   await client.verify
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: `+91${Mobilenumber}`, code: otp })
      .then((verification_check) => resolve(verification_check.status))
      .catch((err) => reject(err));
  });

  module.exports={verifyOtp,sendOtp}
