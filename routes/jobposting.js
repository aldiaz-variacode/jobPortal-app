const { Router } = require('express');
const { check } = require('express-validator');
const jobPostingController = require('../controllers/jobposting');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .post(jobPostingController.create)
    .post(jobPostingController.close)    
    .put(jobPostingController.update)
    .delete(jobPostingController.renew);
    // .post(
    //     [
    //         check('email', 'El email es requerido').notEmpty(),
    //         check('email', 'El email no es valido').isEmail(),
    //         check('name', 'El nombre es requerido').notEmpty(),
    //         check('message', 'El mensaje es requerido').notEmpty(),
    //         middlewares.validateInputs,
    //     ],
    //     jobPostingController.close
    // )

module.exports = router;
