const { validate: validateInputs } = require('./validateInputs');
const { validate: validateJwt } = require('./validateJwt');

module.exports = {
    validateInputs,
    validateJwt
};
