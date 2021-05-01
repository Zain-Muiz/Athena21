const express = require ('express');
const app = express();
const router = express.Router();
const userdashRoute = require('./userdashboard');
const admindashRoute = require('./admindashboard');
const eventsRoute = require('./events');
const redirect = require('../controllers/redirect');
var path = require('path');



router.get('/', (req,res)=>{
    res.sendFile(path.resolve('views/index.html'));
})
router.use('/events', eventsRoute);

router.get('/login', redirect.RedirectHome, (req,res)=>{
    res.render('login');
})
router.get('/signup', redirect.RedirectHome, (req,res)=>{
    res.render('signup');
})
router.get('/adminlogin', (req,res)=>{
    res.sendFile(path.resolve('views/adminlogin.html'));
})

router.get('/logout', redirect.RedirectLogin, (req,res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect("/userdashboard");
        }
    })
    res.redirect("/login");
})


router.use('/eventsubmit', eventsRoute);
router.use('/userdashboard',userdashRoute);
router.use('/admindashboard',admindashRoute);

module.exports = router;