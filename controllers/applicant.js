const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const applicantModel = require('../models/applicant')
const helpers = require('../helpers')
const query = require('../services/query')


module.exports = {
    create: async (req = request, res = response) => {
        try {
            const { name, email, phone, lastLaboralExperience } = req.body;
            const id = helpers.idGenerator()
            if (!req.files){
                return res.status(code.BAD_REQUEST).json({msg: "No hay archivo para subir"})
            }
            const { curriculum } = req.files
            const nameCV = helpers.uploader(id, curriculum)
            if(nameCV.state===false){
                res.status(code.INTERNAL_SERVER_ERROR).json({
                    msg: nameCV.msg
                })
            }
            const applicant = new applicantModel(id, name, email, phone, lastLaboralExperience, nameCV.msg)
            const result = await query.insert([applicant.id, applicant.name, applicant.email, applicant.phone, applicant.lastLaboralExperience, applicant.urlCurriculum])
            console.log('Acción realizada con éxito, registro agregado');
            res.status(code.CREATED)
                .json({msg: 'Acción realizada con éxito, registro agregado', registro: result[0]});
        } catch (error) {
            console.log(error)
            res.status(code.INTERNAL_SERVER_ERROR)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
    get: async (req = request, res = response) => {
        return res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - get' });
    },
};
