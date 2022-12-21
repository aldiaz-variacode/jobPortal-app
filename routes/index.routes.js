const { Router } = require('express');

//import especific routes from routes directory
const jobPostingRoutes = require('./jobposting');
const authRoutes = require('./auth');
const router = Router();

//router.use('/', route.js)
router.use('/jobposting', jobPostingRoutes);
router.use('/auth', authRoutes);

module.exports = router;
