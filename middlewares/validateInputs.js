const { response, request } = require('express');
const { validationResult } = require('express-validator');
const { StatusCodes: code } = require('http-status-codes');

module.exports = {
    validate: (req = request, res = response, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(code.BAD_REQUEST).json(errors);
        }

        next();
    },
    passwordMatch: ({body} = request, res = response, next) => {
        const {pass, duplicatePass} = body;
            if (pass !== duplicatePass) {
                return res.status(code.BAD_REQUEST)
                    .json({ msg: 'Accion rechazada, las password no coinciden'})
            }
        req.pass = pass;
        next();
    }
};
