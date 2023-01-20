const { Router } = require('express');
const { check } = require('express-validator');
const recruiterController = require('../controllers/recruiter');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get(recruiterController.get)

router
    .route('/:id')
    .get(recruiterController.getOne)

router
    .route('/login')
    .post([
        check('accessToken', 'accessToken es necesario').notEmpty(),
        middlewares.validateInputs,
        middlewares.googleVerify
    ], recruiterController.googleSignIn)

module.exports = router;