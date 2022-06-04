const { Router } = require('express');
const { check } = require('express-validator');
const mailingController = require('../controllers/mailing');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get(mailingController.get)
    .post(
        [
            check('email', 'El email es requerido').notEmpty(),
            check('email', 'El email no es valido').isEmail(),
            check('subject', 'El asunto es requerido').notEmpty(),
            check('body', 'El mensaje es requerido').notEmpty(),
            middlewares.validateInputs,
        ],
        mailingController.email
    )
    .put(mailingController.put)
    .delete(mailingController.delete);

module.exports = router;
