const { Router } = require('express');
const { check } = require('express-validator');
const postulantController = require('../controllers/postulant');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get(postulantController.get)
    .post([
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('name', 'El nombre es requerido').notEmpty(),
        check('lastname', 'El apellido es requerido').notEmpty(),
        check('roleId', 'El rolId es requerido').notEmpty(),
        check('phone', 'El telefono es requerido').notEmpty(),
        middlewares.emailExist,
        middlewares.validateInputs
    ], postulantController.create)

router
    .route('/:id')
    .get(postulantController.getOne)

router
    .route('/verified/:token')
    .get([
        middlewares.validatePostulantEmail
    ], postulantController.confirmation)

router
    .route('/login')
    .post([
        check('email', 'El email es requerido').notEmpty(),
        check('email', 'El email no es valido').isEmail(),
        middlewares.isVerified,
    ], postulantController.login)


module.exports = router;