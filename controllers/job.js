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
            const dataForQuery = {
                id: job.id,
                description: job.description,
                position: job.position,
                location: job.location,
                recruiterId: job.recruiterId,
                jobTypeId: job.jobTypeId
            }
            const result = await query.insert('job', dataForQuery)
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
        try {
            const result = await query.get('job');
            return res.status(code.OK)
                .json({ msg: 'Accion exitosa', registros: result });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
    getOne: async (req = request, res = response) => {
        try {
            const {id} = req.params;
            const result = await query.getOneCondition('job', `id = '${id}'`);
            return res.status(code.OK)
                .json({ msg: 'Accion exitosa', registros: result });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    }
};