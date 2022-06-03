const { Router } = require('express');
const { check } = require('express-validator');
const middlewares = require('../middlewares');
const mailingController = require('../controllers/mailing');

const router = Router();

router
    .route('/')
    .post(
        [
            check('email', 'El email es requerido').notEmpty(),
            check('email', 'El email no es valido').isEmail(),
            check('subject', 'El asunto es requerido'),
            check('body', 'El mensaje es requerido').notEmpty(),
            middlewares.validateInputs,
        ],
        mailingController.email
    );
