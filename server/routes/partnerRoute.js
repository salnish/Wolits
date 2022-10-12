const express= require('express');
const router= express.Router();
const { sentOtp,
    verifyNumber,
    postApplication,
    restaurantDetails,
    registerPartner,
    addDish,
    getDishes,
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
router.post('/addDish',partnerProtect,upload.single('image'),addDish);
router.get('/getDishes/:page/:limit',partnerProtect,getDishes)


module.exports= router;