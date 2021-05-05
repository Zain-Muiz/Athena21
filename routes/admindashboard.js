const express = require ('express');
const app = express();
const router = express.Router();

const adminauthcntrl = require('../controllers/adminauthcontrol.js');
const dbupdate = require('../controllers/dbupdate.js');


router.get('/', adminauthcntrl.adminroute);
router.get('/phupdate', dbupdate.updatenumber);


module.exports = router;
