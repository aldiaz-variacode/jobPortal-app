const { validate: validateInputs, passwordMatch } = require('./validateInputs');
const { validateRecruiter, validatePostulantEmail, validatePostulant } = require('./validateJwt');
const {emailExist, accountValidated, passRecovery} = require('./dbValidator');

module.exports = {
    validateInputs,
    passwordMatch,
    validateRecruiter,
    validatePostulant,
    validatePostulantEmail,
    emailExist,
    accountValidated,
    passRecovery
};
