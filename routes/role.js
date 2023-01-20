const { Router } = require('express');
// const { check } = require('express-validator');
const roleController = require('../controllers/role');
// const helpers = require('../helpers')
// const middlewares = require('../middlewares');

const router = Router();

router
    .route('/')
    .get(roleController.get)

module.exports = router;