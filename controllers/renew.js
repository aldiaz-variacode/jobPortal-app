const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const query = require('../services/querySql')


module.exports = {
    getRecruiter: async ({user} = request, res = response) => {
        try {
            return res.status(code.OK)
                .json({user});
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
    getPostulant: async ({user} = request, res = response) => {
        try {
            return res.status(code.OK)
                .json({user});
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
};