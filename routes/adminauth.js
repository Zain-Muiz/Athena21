const express = require('express');
const app = express();
const router = express.Router();  
const adminauthcntrl = require('../controllers/adminauthcontrol.js');


router.post('/login', adminauthcntrl.login );


module.exports = router;