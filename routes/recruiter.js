const { Router } = require('express');
const { check } = require('express-validator');
const recruiterController = require('../controllers/recruiter');
const helpers = require('../helpers')
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .post([
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('name', 'El nombre es requerido').notEmpty(),
        check('lastname', 'El apellido es requerido').notEmpty(),
        check('roleId', 'El rolid es requerido').notEmpty(),
        check('email').custom(helpers.emailExist),
        middlewares.validateInputs
    ], recruiterController.create)

module.exports = router;