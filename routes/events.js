const express = require ('express');
const app = express();
const router = express.Router();
const eventcontroller = require('../controllers/eventcontroller.js');
const redirect = require('../controllers/redirect');

<<<<<<< HEAD
router.post('/',redirect.RedirectLogin,redirect.RedirectVerify, eventcontroller.registerevent);
=======


router.post('/', redirect.RedirectLogin,redirect.RedirectVerify, eventcontroller.registerevent);
>>>>>>> upstream/main

router.get('/', eventcontroller.getevents);

router.get('/:id', eventcontroller.eachevent);

module.exports = router;
