const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const helpers = require('../helpers');
const query = require('../services/query');
const Recruiter = require('../models/recruiter');



module.exports = {
    googleSignIn: async (req = request, res = response) => {
        const { accessToken } = req.body;
        // console.log(accessToken)
        // res.status(code.OK).json({accessToken})
        try {
            const {
                name,
                email,
            } = await helpers.googleVerify(accessToken);
            const queryString = `SELECT * FROM recruiter WHERE email = '${email}'`;
            let user = await query.get(queryString)[0];
            console.log(user, 'user auth 21')
            if (!user) {
                // Si el usuario no existe, tengo que crearlo
                const newUser = new Recruiter(helpers.idGenerator(), name.split('')[0], name.split('')[1], email, 'd96a2209', true);
                const data = {
                    id: newUser.id,
                    name: newUser.name,
                    lastname : newUser.lastname,
                    email: newUser.email,
                    roleId: newUser.roleId,
                    google: newUser.google,
                };
                user = await query.insert('recruiter', data)
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
