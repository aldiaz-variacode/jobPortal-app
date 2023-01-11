const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const postulationModel = require('../models/postulation')
const helpers = require('../helpers')
const query = require('../services/querySql')


module.exports = {
    create: async (req = request, res = response) => {
        try {
            const { jobId, postulantId } = req.body;
            const id = helpers.idGenerator();
            const { curriculum } = req.files
            if (!curriculum){
                return res.status(code.BAD_REQUEST).json({msg: "No hay archivo para subir"})
            }
            const nameCV = helpers.uploader(id, curriculum)
            if(nameCV.state===false){
                res.status(code.INTERNAL_SERVER_ERROR).json({
                    msg: nameCV.msg
                })
            }
            const postulation = new postulationModel(id, jobId, postulantId, nameCV.msg)
            const dataForQuery = {
                id: postulation.id,
                jobId: postulation.jobId,
                postulantId: postulation.postulantId,
                cvUrl: postulation.cvUrl
            }
            const result = await query.insert('postulation', dataForQuery);
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
            const queryString = `SELECT * FROM postulation;`
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
            const queryString = `SELECT * FROM postulation WHERE id = '${id}';`
            const result = await query.get(queryString);
            return res.status(code.OK)
                .json({ msg: 'Accion exitosa', registros: result });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
};