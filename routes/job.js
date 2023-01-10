const { Router } = require('express');
const { check } = require('express-validator');
const jobController = require('../controllers/job');
const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get(jobController.get)
    .post([
        check('description', 'La descripcion es requerida').notEmpty(),
        check('position', 'El cargo es requerido').notEmpty(),
        check('location', 'La ubicacion es requerida').notEmpty(),
        check('recruiterId', 'El id del reclutador es requerido').notEmpty(),
        check('jobTypeId', 'El id del tipo de empleo es requerido').notEmpty(),
        middlewares.validateInputs
    ], jobController.create)

router
    .route('/:id')
    .get(jobController.getOne)
router
    .route('/most-recent')
    .get(jobController.getMostRecent)
router
    .route('/recruiter/:recruiterId')
    .get([
        middlewares.validateRecruiter
    ],jobController.getByRecruiterId)
module.exports = router;