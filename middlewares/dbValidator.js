const { response, request } = require('express');
const { StatusCodes:code } = require('http-status-codes');
const query = require('../services/querySql')

module.exports = {
    emailExist: async (req = request, res = response, next) => {
        const {email} = req.body
        if (!email) {
            return res.status(code.BAD_REQUEST).json({
                msg: 'No esta el email en la peticion'
            });
        }
        try {
            const emailExist = await query.getOneDBvalidator("postulant", `email = '${email}'`);
            if(emailExist.includes(email)){
                return res.status(code.BAD_REQUEST).json({
                    msg: `El email ${email}, ya existe`
                })
            }
            next()
        } catch (error) {
            console.log(error);
            res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: 'Ponganse en contacto con un administrador'
            })
        }
    },
    isVerified: async (req = request, res = response, next) => {
        const {email} = req.body
        if (!email) {
            return res.status(code.BAD_REQUEST).json({
                msg: 'No esta el email en la peticion'
            });
        }
        try {
            const queryString = `SELECT p.id, p.name|| ' ' ||p.lastname as postulant, p.email, p.phone, p.verified, role.type FROM postulant as p INNER JOIN role ON role.id = p.roleid WHERE p.email = '${email}';`
            const [isVerified] = await query.get(queryString);
            if (isVerified.verified === false) {
                return res.status(code.BAD_REQUEST).json({
                    msg: `El email ${email}, no está verificado.`
                })
            }
            req.user = isVerified
            next()
        } catch (error) {
            console.log(error);
            res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: 'Ponganse en contacto con un administrador'
            })
        }
    }
}