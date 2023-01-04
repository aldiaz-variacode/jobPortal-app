const { validate: validateInputs } = require('./validateInputs');
const { validate: validateJwt } = require('./validarJwt');

module.exports = {
    validateInputs,
    validateJwt
};
