const { Router } = require('express');
const { check } = require('express-validator');
const postulationController = require('../controllers/postulation');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .post([
        check('jobId', 'El id del empleo es requerido').notEmpty(),
        check('postulantId', 'El id del postulante es requerido').notEmpty(),
        check('experience', 'La experiencia es requerida').notEmpty(),
        check('cvurl', 'El cv es requerido').notEmpty(),
        middlewares.validateInputs
    ], postulationController.create)

module.exports = router;