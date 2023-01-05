const { validate: validateInputs } = require('./validateInputs');
const { validateRecruiter, validatePostulant } = require('./validateJwt');
const {emailExist, isVerified} = require('./dbValidatordbValidator');

module.exports = {
    validateInputs,
    validateRecruiter,
    validatePostulant,
    emailExist,
    isVerified
};
