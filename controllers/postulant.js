const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const postulantModel = require('../models/postulant')
const helpers = require('../helpers')
const query = require('../services/querySql');
const Mailer = require('../models/mail');


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
                roleId: postulant.roleId,
                verified: postulant.verified
            };
            const token = await helpers.jwtGenerator(postulant.id);
            const dataForEmail = {
                mailService: 'gmail',
                mailTo: postulant.email,
                text: `Hola ${postulant.name} gracias por querer ser un Variacoder`,
                html: `
                <div id="emailTemplate">
                <p>Para poder continuar debes confirmar tu cuenta, ingresando al siguiente enlace:</p>
                <a href="https://vc-linkedin-production.up.railway.app/renew/verified/${token}">Verificar Cuenta</a>
                </div>
                `
            };
            const mail = new Mailer(dataForEmail.mailService, dataForEmail.mailTo, dataForEmail.text, dataForEmail.html);
            mail.sendMail()
            const result = await query.insert('postulant', dataForQuery);
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
            const queryString = `SELECT * FROM postulant;`
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
            const queryString = `SELECT * FROM postulant WHERE id = '${id}';`
            const result = await query.get(queryString);
            return res.status(code.OK)
                .json({ msg: 'Accion exitosa', registros: result });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    },
    login: async ({user} = request, res = response) => {
        try {
            return res.status(code.OK)
                .json({ msg: 'Accion exitosa', registros: user });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({msg: 'Accion rechazada', error: error})
        }
    }
};