const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const userVariacode = require('../models/userVariacode')
const helpers = require('../helpers')
const query = require('../services/querySql')

module.exports = {
    createRecruiter: async (req = request, res = response) => {
        try {
            const { name, lastname, email, roleId } = req.body;
            const recruiter = new userVariacode(helpers.idGenerator(), name, lastname, email, roleId)
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
    login: async (req = request, res = response) => {
        try {
            const queryString = `SELECT a.id, a.name || ' ' || a.lastname as admin, a.email, role.type FROM admin as a INNER JOIN role ON role.id = a.roleid WHERE a.email = '${email}';`;
            let [user] = await query.get(queryString);
            if (!user) {
                // Si el usuario no existe
                res.status(code.BAD_REQUEST)
                    .json({
                        msg: 'El usuario no existe',
                        error
                    })
            }
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
    }
}