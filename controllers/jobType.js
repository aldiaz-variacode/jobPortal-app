const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const query = require('../services/query')


module.exports = {
    create: async (req = request, res = response) => {
        return res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - post' });
    },
    get: async (req = request, res = response) => {
        const result = await query.get('jobtype');
        return res.status(code.OK)
            .json({ msg: 'Accion exitosa', registros: result });
    },
};