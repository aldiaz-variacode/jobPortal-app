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
            const today = new Date(Date.now())
            const result = await query.update('postulant', `verified = true, verifiedAt = ${today.toISOString()}`, `id = ${user.id}`)
            return res.status(code.OK)
                .json({result});
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
};