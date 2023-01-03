const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const recruiterModel = require('../models/recruiter')
const helpers = require('../helpers')
const query = require('../services/query')


module.exports = {
    create: async (req = request, res = response) => {
        try {
            const { name, lastname, email, roleId } = req.body;
            const recruiter = new recruiterModel(helpers.idGenerator(), name, lastname, email, roleId)
            const dataForQuery = {
                id: recruiter.id,
                name: recruiter.name,
                lastname: recruiter.lastname,
                email: recruiter.email,
                roleId: recruiter.roleId
            }
            const result = await query.insert('recruiter', dataForQuery);
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
            const queryString = `SELECT * FROM recruiter;`
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
            const queryString = `SELECT * FROM recruiter WHERE id = '${id};`
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
