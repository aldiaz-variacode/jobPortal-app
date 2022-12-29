const { Router } = require('express');

//import especific routes from routes directory
const applicantRoutes = require('./applicant');
const recruiterRoutes = require('./recruiter');
const jobRoutes = require('./job');
const postulantRoutes = require('./postulant');
const postulationRoutes = require('./postulation');
const router = Router();

//router.use('/', route.js)
router.use('/applicant', applicantRoutes);
router.use('/recruiter', recruiterRoutes);
router.use('/job', jobRoutes);
router.use('/postulant', postulantRoutes);
router.use('/postulation', postulationRoutes);


module.exports = router;
