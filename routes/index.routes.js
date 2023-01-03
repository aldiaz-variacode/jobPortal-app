const { Router } = require('express');

//import especific routes from routes directory
const recruiterRoutes = require('./recruiter');
const jobRoutes = require('./job');
const postulantRoutes = require('./postulant');
const postulationRoutes = require('./postulation');
const roleRoutes = require('./role');
const jobTypeRoutes = require('./jobType');
const authRoutes = require('./auth');
const router = Router();

//router.use('/', route.js)
router.use('/recruiter', recruiterRoutes);
router.use('/job', jobRoutes);
router.use('/postulant', postulantRoutes);
router.use('/postulation', postulationRoutes);
router.use('/role', roleRoutes);
router.use('/jobType', jobTypeRoutes);
router.use('/login', authRoutes);


module.exports = router;
