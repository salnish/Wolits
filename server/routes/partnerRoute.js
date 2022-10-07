const express= require('express');
const router= express.Router();
const { sentOtp,
    verifyNumber,
    postApplication,
    restaurantDetails,
    registerPartner,
    loginPartner}= require('../controllers/partnerController')
const { partnerTimeOut ,partnerProtect} = require("../middleware/authMIddleware");
const upload = require('../utils/multer')

router.post('/',loginPartner)
router.post('/verifyNumber',sentOtp)
router.put('/verifyOtp',partnerTimeOut,verifyNumber)
router.put('/register',partnerTimeOut,registerPartner)
router.post('/applyForm',partnerProtect,upload.fields([
    {name:"fssaiFile",maxCount:1},
    {name:"pancardFile",maxCount:1},
    {name:"passbookFile",maxCount:1},
    {name:"iconFile",maxCount:1}
]),postApplication)
router.get('/getForm',partnerProtect,restaurantDetails)

module.exports= router;