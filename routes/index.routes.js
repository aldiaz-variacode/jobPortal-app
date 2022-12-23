const { Router } = require('express');

//import especific routes from routes directory
const applicantRoutes = require('./applicant');
const router = Router();

//router.use('/', route.js)
router.use('/applicant', applicantRoutes);

module.exports = router;
