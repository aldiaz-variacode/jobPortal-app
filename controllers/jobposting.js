const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');

module.exports = {
    create: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - create' });
    },
    close: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - close' });
    },
    update: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - update' });
    },
    renew: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - renew' });
    },
};
