const { validate: validateInputs } = require('./validateInputs');
const { validateRecruiter, validatePostulant } = require('./validateJwt');

module.exports = {
    validateInputs,
    validateRecruiter,
    validatePostulant
};
