const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const jobModel = require('../models/job')
const helpers = require('../helpers')
const query = require('../services/query')


module.exports = {
    create: async (req = request, res = response) => {
        try {
            const { description, position, location, recruiterId, jobTypeId } = req.body;
            const job = new jobModel(helpers.idGenerator(), description, position, location, recruiterId, jobTypeId)
            const result = await query.insert('job', [job.id, job.description, job.position, job.location, job.recruiterId, job.jobTypeId])
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