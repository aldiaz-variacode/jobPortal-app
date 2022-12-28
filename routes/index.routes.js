const { Router } = require('express');

//import especific routes from routes directory
const applicantRoutes = require('./applicant');
const recruiterRoutes = require('./recruiter')
const router = Router();

//router.use('/', route.js)
router.use('/applicant', applicantRoutes);
router.use('/recruiter', recruiterRoutes);


module.exports = router;
