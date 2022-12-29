const { Router } = require('express');
const { check } = require('express-validator');
const jobController = require('../controllers/job');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .post([
        check('description', 'La descripcion es requerida').notEmpty(),
        check('position', 'El cargo es requerido').notEmpty(),
        check('location', 'La ubicacion es requerida').notEmpty(),
        check('recruiterId', 'El id del reclutador es requerido').notEmpty(),
        check('jobtypeId', 'El id del tipo de empleo es requerido').notEmpty(),
        middlewares.validateInputs
    ], jobController.create)

module.exports = router;