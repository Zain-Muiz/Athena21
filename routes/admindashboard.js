const express = require ('express');
const app = express();
const router = express.Router();

const adminauthcntrl = require('../controllers/adminauthcontrol.js');
const redirect = require('../controllers/redirect');


router.get('/',redirect.RedirectadminLogin, adminauthcntrl.adminroute);
router.get('/paidregistrations',redirect.RedirectadminLogin, adminauthcntrl.getregistrations);
router.get('/unpaidregistrations',redirect.RedirectadminLogin, adminauthcntrl.getallregistrations);


module.exports = router;