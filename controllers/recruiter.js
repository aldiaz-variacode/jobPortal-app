const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const recruiterModel = require('../models/recruiter')
const helpers = require('../helpers')
const query = require('../services/query')


module.exports = {
    create: async (req = request, res = response) => {
        try {
            const { name, lastname, email, roleid } = req.body;
            const id = helpers.idGenerator()
            const recruiter = new applicantModel(id, name, lastname, email, roleid)
            const result = await query.insert('recruiter', [recruiter.id, recruiter.name, recruiter.lastname, recruiter.email, recruiter.roleid])
            console.log('Acción realizada con éxito, registro agregado');
            res.status(code.CREATED)
                .json({msg: 'Acción realizada con éxito, registro agregado', registro: result[0]});
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
    get: async (req = request, res = response) => {
        return res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - get' });
    },
};
