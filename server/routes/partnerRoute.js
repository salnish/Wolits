const express= require('express');
const router= express.Router();
const { sentOtp,
    verifyNumber,
    postApplication,
    registerPartner,
    loginPartner}= require('../controllers/partnerController')
const { partnerTimeOut ,partnerProtect} = require("../middleware/authMIddleware");

router.post('/',loginPartner)
router.post('/verifyNumber',sentOtp)
router.put('/verifyOtp',partnerTimeOut,verifyNumber)
router.put('/register',partnerTimeOut,registerPartner)
router.post('/applyForm',partnerProtect,postApplication)

module.exports= router;