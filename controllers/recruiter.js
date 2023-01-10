const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const recruiterModel = require('../models/recruiter')
const helpers = require('../helpers')
const query = require('../services/querySql')


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
    },
    googleSignIn: async (req = request, res = response) => {
        const { accessToken } = req.body;
        try {
            const {
                name,
                email,
            } = await helpers.googleVerify(accessToken);
            const queryString = `SELECT r.id, r.name || ' ' || r.lastname as recruiter, r.email, role.type FROM recruiter as r INNER JOIN role ON role.id = r.roleid WHERE r.email = '${email}';`;
            let [user] = await query.get(queryString);
            // console.log('auth 19',user);
            if (!user) {
                // Si el usuario no existe, tengo que crearlo
                const newUser = new recruiterModel(helpers.idGenerator(), name.split(' ')[0], name.split(' ')[1], email, 'd96a2209', true);
                const data = {
                    id: newUser.id,
                    name: newUser.name,
                    lastname : newUser.lastname,
                    email: newUser.email,
                    roleId: newUser.roleId,
                    google: newUser.google,
                };
                registerUser = await query.insert('recruiter', data);
                [user] = await query.get(queryString);
            }
            // console.log('auth 33', user)
            // Generar el Jwt
            const token = await helpers.jwtGenerator(user.id);
            res.status(code.OK).json({
                user,
                token,
            });
        } catch (error) {
            console.log(error)
            res.status(code.BAD_REQUEST)
                .json({
                    ok: false,
                    msg: 'El token no se pudo verificar',
                    error
                })
        }
    },
};
