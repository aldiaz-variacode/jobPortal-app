const { Router } = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/login')
    .post([
        check('id_token', 'id_token es necesario').notEmpty(),
        middlewares.validateInputs
    ], authController.googleSignIn)


module.exports = router;