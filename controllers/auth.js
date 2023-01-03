const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const helpers = require('../helpers');
const query = require('../services/query');
const Recruiter = require('../models/recruiter');



module.exports = {
    googleSignIn: async (req = request, res = response) => {
        const { accessToken } = req.body;
        try {
            const {
                name,
                email,
            } = await helpers.googleVerify(accessToken);
            const queryString = `SELECT * FROM recruiter WHERE email = '${email}'`;
            let user = await query.get(queryString);
            console.log(user, 'auth 19')
            if (!user[0]) {
                // Si el usuario no existe, tengo que crearlo
                const newUser = new Recruiter(helpers.idGenerator(), name.split(' ')[0], name.split(' ')[1], email, 'd96a2209', true);
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
