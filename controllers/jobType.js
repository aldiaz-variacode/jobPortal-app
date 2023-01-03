const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const query = require('../services/querySql')


module.exports = {
    create: async (req = request, res = response) => {
        return res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - post' });
    },
    get: async (req = request, res = response) => {
        const queryString = `SELECT * FROM jobtype;`
        const result = await query.get(queryString);
        return res.status(code.OK)
            .json({ msg: 'Accion exitosa', registros: result });
    },
};