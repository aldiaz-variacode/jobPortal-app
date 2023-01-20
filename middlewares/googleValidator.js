const { response, request } = require('express');
const { StatusCodes:code } = require('http-status-codes');
const query = require('../services/querySql')


module.exports = {
    googleVerify: async (req = request, res = response, next) => {
        const { accessToken } = req.body;
        try {
            const {
                email,
            } = await helpers.googleVerify(accessToken);
            
            req.email = email;
            next();
            
        } catch (error) {
            console.log(error);
            res.status(code.UNAUTHORIZED).json({
                msg: 'Token no valido'
            })
        }
    },
}