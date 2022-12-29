const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const query = require('../services/query')


module.exports = {
    create: async (req = request, res = response) => {
        return res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - post' });
    },
    get: async (req = request, res = response) => {
        try {
            const result = await query.get('role');
            return res.status(code.OK)
                .json({ msg: 'Accion exitosa', registros: result });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
};
