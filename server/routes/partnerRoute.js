const express= require('express');
const router= express.Router();
const {sentOtp}= require('../controllers/partnerController')

router.post('/verifyNumber',sentOtp)

module.exports= router;