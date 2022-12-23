const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const applicantModel = require('../models/applicant')
const uuid = require('../helpers/uuid')
const query = require('../services/query')


module.exports = {
    create: async (req = request, res = response) => {
        const { name, email, phone, lastLaboralExperience } = req.body;
        const { curriculum } = req.files
        const extension = curriculum.name.split(".")[1];
        const extensionValida = 'pdf';
        if(extensionValida !== 'pdf'){
            return res.status(code.BAD_REQUEST).json({msg: 'La extension no es valida'});
        };
        const nameCV = `${name}-CV.${extension}`;
        curriculum.mv(`./upload/${nameCV}`, (err) => {
            res.status(code.BAD_REQUEST)
        })
        // res.send('File upload')
        const applicant = new applicantModel(uuid.gen(), name, email, phone, lastLaboralExperience, `/db/cv${nameCV}`)
        const result = await query.insert([applicant.id, applicant.name, applicant.email, applicant.phone, applicant.lastLaboralExperience, applicant.urlCurriculum])
        console.log('Acción realizada con éxito, registro agregado');
        res.status(code.OK)
            .json({msg: 'Acción realizada con éxito, registro agregado', registro: result[0]});
    },
    get: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - get' });
    },
};
