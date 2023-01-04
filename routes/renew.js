const { Router } = require('express');
const renewController = require('../controllers/renew');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get([
        middlewares.validateJwt
    ], renewController.get)


module.exports = router;