const { Router } = require('express');
const { check, param } = require('express-validator');
const postulationController = require('../controllers/postulation');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get(postulationController.get)
    .post([
        check('jobId', 'El id del empleo es requerido').notEmpty(),
        check('postulantId', 'El id del postulante es requerido').notEmpty(),
        // check('cvUrl', 'El cv es requerido').notEmpty(),
        middlewares.validateInputs
    ], postulationController.create)
    
router
    .route('/:id')
    .get([
        param('id', 'El id del empleo es requerido').notEmpty(),
    ],postulationController.getOne)

router
    .route('/postulant/:postulantid')
    .get([
        param('postulantid', 'El id del postulante es requerido').notEmpty(),
    ], postulationController.getByPotulantId)

router
    .route('/job/:jobid')
    .get([
        param('jobid', 'El id del empleo es requerido').notEmpty(),
    ], postulationController.getPostulantByJobId)

module.exports = router;