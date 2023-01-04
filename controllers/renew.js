const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const query = require('../services/querySql')


module.exports = {
    get: async (req = request, res = response) => {
        try {
            console.log('renew 9', req.user);
            const {user} = req.user
            return res.status(code.OK)
                .json({user});
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
};