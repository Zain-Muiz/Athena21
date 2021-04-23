const express = require ('express');
const app = express();
const router = express.Router();
const paymentcontroller = require('../controllers/paymentcontrol.js');

router.get('/', (req,res)=>{
    if(req.session.name){
        res.render('user', {name: req.session.name, user: "User"});
    }
    else {
        res.redirect('/login');
    }
})
router.get('/registerevent', (req,res)=>{
    if(req.session.name){
        res.render('eventreg');
    }
    else {
        res.redirect('/login');
    }
})



router.get('/eventpayment', paymentcontroller.amountgenerator);



//router.get('/', userauthcntrl.userroute);


module.exports = router;