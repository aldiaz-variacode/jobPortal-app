const { Router } = require('express');
const jobTypeController = require('../controllers/jobType');


const router = Router();

router
    .route('/')
    .get(jobTypeController.get)


module.exports = router;