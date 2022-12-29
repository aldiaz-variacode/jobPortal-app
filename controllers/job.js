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
            const queryString = `SELECT job.id, job.description, job.position, job.location, r.name || ' ' || r.lastname as recruiter, jt.type FROM job INNER JOIN recruiter as r ON job.recruiterid = r.id INNER JOIN jobtype as jt ON job.jobtypeid = jt.id;`
            const result = await query.get(queryString);
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
            const queryString = `SELECT * FROM job WHERE d = '${id};`
            const result = await query.get(queryString);
            return res.status(code.OK)
                .json({ msg: 'Accion exitosa', registros: result });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    }
};