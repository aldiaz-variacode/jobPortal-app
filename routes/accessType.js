const { Router } = require('express');
const accessTypeController = require('../controllers/accessType');


const router = Router();

router
    .route('/')
    .get(accessTypeController.get)


module.exports = router;