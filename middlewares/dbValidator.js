const { response, request } = require('express');
const { StatusCodes:code } = require('http-status-codes');
const query = require('../services/querySql')

module.exports = {
    emailExist: async (req = request, res = response, next) => {
        const {email} = req.body
        const emailExist = await query.getOneDBvalidator("postulant", `email = '${email}'`);
        if(emailExist.includes(email)){
            return res.status(code.BAD_REQUEST).json({
                msg: `El email ${email}, ya existe`
            })
        }
        next()
    },
    isVerified: async (req = request, res = response, next) => {
        const {email} = req.body
        const queryString = `SELECT * FROM postulant WHERE email = '${email}';`
        const [isVerified] = await query.get(queryString);
        if (isVerified.verified === false) {
            return res.status(code.BAD_REQUEST).json({
                msg: `El email ${email}, no está verificado.`
            })
        }
        console.log(isVerified)
        req.user = isVerified
    }
}