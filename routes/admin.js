const { Router } = require('express');
const { check } = require('express-validator');
const adminController = require('../controllers/admin');
const middlewares = require('../middlewares');
const { route } = require('./recruiter');

const router = Router();
router
    .route('/newrecruiter')
    .post([
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('name', 'El nombre es requerido').notEmpty(),
        check('lastname', 'El apellido es requerido').notEmpty(),
        check('roleId', 'El rolid es requerido').notEmpty(),
        middlewares.emailExist,
        middlewares.validateInputs
    ], adminController.createRecruiter)

router
    route('/login')
    .post([
        check('accessToken', 'accessToken es necesario').notEmpty(),
        middlewares.validateInputs
    ], adminController.login )

module.exports = router;
