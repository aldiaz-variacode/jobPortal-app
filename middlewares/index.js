const { validate: validateInputs } = require('./validateInputs');
const { validateRecruiter, validatePostulantEmail, validatePostulant } = require('./validateJwt');
const {emailExist, accountValidated} = require('./dbValidator');

module.exports = {
    validateInputs,
    validateRecruiter,
    validatePostulant,
    validatePostulantEmail,
    emailExist,
    accountValidated
};
