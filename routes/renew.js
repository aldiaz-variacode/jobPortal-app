const { Router } = require('express');
const renewController = require('../controllers/renew');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get([
        middlewares.validateRecruiter
    ], renewController.getRecruiter)

router
    .route('/verified/:token')
    .get([
        middlewares.validatePostulant
    ], renewController.getPostulant)

module.exports = router;