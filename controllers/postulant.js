const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const postulantModel = require('../models/postulant')
const helpers = require('../helpers')
const query = require('../services/query');
const postulation = require('./postulation');


module.exports = {
    create: async (req = request, res = response) => {
        try {
            const { name, lastname, email, phone, roleId } = req.body;
            const postulant = new postulantModel(helpers.idGenerator(), name, lastname, email, phone, roleId)
            const dataForQuery = {
                id: postulant.id,
                name: postulant.name,
                lastname: postulant.lastname,
                email: postulant.email,
                phone: postulant.phone,
                roleId: postulant.roleId
            }
            const result = await query.insert('postulant', dataForQuery)
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