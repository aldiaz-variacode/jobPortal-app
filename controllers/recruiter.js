const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const helpers = require('../helpers')
const query = require('../services/querySql')


module.exports = {
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
    googleSignIn: async ({email} = request, res = response) => {
        try {
            const queryString = `SELECT r.id, r.name || ' ' || r.lastname as recruiter, r.email, role.type FROM recruiter as r INNER JOIN role ON role.id = r.roleid WHERE r.email = '${email}';`;
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
    },
};
