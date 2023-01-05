const { Router } = require('express');
const { check } = require('express-validator');
const recruiterController = require('../controllers/recruiter');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get(recruiterController.get)
    .post([
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('name', 'El nombre es requerido').notEmpty(),
        check('lastname', 'El apellido es requerido').notEmpty(),
        check('roleId', 'El rolid es requerido').notEmpty(),
        middlewares.emailExist,
        middlewares.validateInputs
    ], recruiterController.create)

router
    .route('/:id')
    .get(recruiterController.getOne)

router
    .route('/googleAuth')
    .post([
        check('accessToken', 'accessToken es necesario').notEmpty(),
        middlewares.validateInputs
    ], recruiterController.googleSignIn)

module.exports = router;