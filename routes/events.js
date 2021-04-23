const express = require ('express');
const app = express();
const router = express.Router();
const eventcontroller = require('../controllers/eventcontroller.js');

router.post('/', eventcontroller.registerevent);

module.exports = router;