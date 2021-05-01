const express = require ('express');
const app = express();
const router = express.Router();
const eventcontroller = require('../controllers/eventcontroller.js');

router.post('/', eventcontroller.registerevent);

router.get('/', eventcontroller.getevents);

router.get('/:id', eventcontroller.eachevent);

module.exports = router;