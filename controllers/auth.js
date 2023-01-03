const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const applicantModel = require('../models/applicant');
const helpers = require('../helpers');
const query = require('../services/query');
const Recruiter = require('../models/recruiter');



module.exports = {
    googleSignIn: async (req = request, res = response) => {
        const { accessToken } = req.body;
        try {
            const {
                name,
                picture,
                email,
            } = await helpers.googleVerify(accessToken);
            const queryString = `SELECT * FROM recruiter WHERE email = '${email}'`;
            let user = await query.get(queryString);
            if (!user) {
                // Si el usuario no existe, tengo que crearlo
                const data = {
                    id: helpers.idGenerator(),
                    name,
                    lastname : name,
                    email,
                    roleId: 'd96a2209',
                    google: true,
                };
                user = new Recruiter(...data);
            }
            // // Si el usuario en DB
            // if (!usuario.estado) {
            //     return res.status(code.UNAUTHORIZED).json({
            //         msg: 'Hable con el administrador, usuario bloqueado',
            //     });
            // }
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
