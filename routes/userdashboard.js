const express = require ('express');
const app = express();
const router = express.Router();
const redirect = require('../controllers/redirect');
const paymentcontroller = require('../controllers/paymentcontrol.js');

router.get('/', redirect.RedirectLogin,redirect.RedirectVerify, (req,res)=>{
        res.render('user', {name: req.session.name, user: "User"});
})


router.get('/registerevent', redirect.RedirectLogin,redirect.RedirectVerify, (req,res)=>{
        res.render('eventreg');
})



router.get('/eventpayment', paymentcontroller.amountgenerator);



//router.get('/', userauthcntrl.userroute);


module.exports = router;