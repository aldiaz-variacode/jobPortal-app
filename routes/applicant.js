const { Router } = require('express');
const { check } = require('express-validator');
const applicantController = require('../controllers/applicant');
const helpers = require('../helpers')
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .post([
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('name', 'El nombre es requerido').notEmpty(),
        check('phone', 'El telefono es requerido').notEmpty(),
        check('lastLaboralExperience', 'La ultima experiencia laboral es requerida').notEmpty(),
        // check('curriculum', 'Tu cv es requerido').notEmpty(),
        check('email').custom(helpers.emailExist),
        middlewares.validateInputs
    ], applicantController.create)

module.exports = router;
