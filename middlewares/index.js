const { validate: validateInputs, passwordMatch } = require('./validateInputs');
const { validateRecruiter, validatePostulantEmail, validatePostulant } = require('./validateJwt');
const {emailExist, accountValidated, passRecovery} = require('./dbValidator');
const {googleVerify} = require('./googleValidator');

module.exports = {
    validateInputs,
    passwordMatch,
    validateRecruiter,
    validatePostulant,
    validatePostulantEmail,
    emailExist,
    accountValidated,
    passRecovery,
    googleVerify
};
