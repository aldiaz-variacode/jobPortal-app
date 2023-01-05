const { validate: validateInputs } = require('./validateInputs');
const { validateRecruiter, validatePostulantEmail, validatePostulant } = require('./validateJwt');
const {emailExist, isVerified} = require('./dbValidator');

module.exports = {
    validateInputs,
    validateRecruiter,
    validatePostulant,
    validatePostulantEmail,
    emailExist,
    isVerified
};
