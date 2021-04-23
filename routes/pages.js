const express = require ('express');
const app = express();
const router = express.Router();
const userdashRoute = require('./userdashboard');
const admindashRoute = require('./admindashboard');
const eventsRoute = require('./events');
var path = require('path');



router.get('/', (req,res)=>{
    res.sendFile(path.resolve('views/index.html'));
})
router.get('/events', (req,res)=>{
    res.sendFile(path.resolve('views/events.html'));
})
router.get('/login', (req,res)=>{
    res.sendFile(path.resolve('views/login.html'));
})
router.get('/signup', (req,res)=>{
    res.sendFile(path.resolve('views/signup.html'));
})
router.get('/adminlogin', (req,res)=>{
    res.sendFile(path.resolve('views/adminlogin.html'));
})


router.use('/eventsubmit', eventsRoute);
router.use('/userdashboard',userdashRoute);
router.use('/admindashboard',admindashRoute);

module.exports = router;