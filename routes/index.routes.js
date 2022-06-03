const { Router } = require('express');

//import especific routes from routes directory
const mailingRoutes = require('./mailing');
const router = Router();

//router.use('/', route.js)
router.use('/mailing', mailingRoutes);

module.exports = router;
