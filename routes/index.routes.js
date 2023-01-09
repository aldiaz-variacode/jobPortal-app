const { Router } = require('express');

//import especific routes from routes directory
const recruiterRoutes = require('./recruiter');
const jobRoutes = require('./job');
const postulantRoutes = require('./postulant');
const postulationRoutes = require('./postulation');
const roleRoutes = require('./role');
const jobTypeRoutes = require('./jobType');
const renewRoutes = require('./renew');
const accessTypeRoutes = require('./accessType');
const router = Router();

//router.use('/', route.js)
router.use('/recruiter', recruiterRoutes);
router.use('/job', jobRoutes);
router.use('/postulant', postulantRoutes);
router.use('/postulation', postulationRoutes);
router.use('/role', roleRoutes);
router.use('/jobType', jobTypeRoutes);
router.use('/renew', renewRoutes);
router.use('/jobAccessType', accessTypeRoutes);


module.exports = router;
