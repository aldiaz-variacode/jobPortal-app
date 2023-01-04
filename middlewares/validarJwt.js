const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { StatusCodes:code } = require('http-status-codes');


module.exports = {
    validate: async (req = request, res = response, next) => {
        const token = req.header('x-token');
        if ( !token ) {
            return res.status(code.UNAUTHORIZED).json({
                msg: 'No hay token en la peticion'
            });
        };
        try {
            const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
            //leer el user que corresponde al id
            const queryString = `SELECT * FROM recruiter WHERE id = '${id};`
            const user = await query.get(queryString);

            if ( !user[0] ) {
                return res.status(code.UNAUTHORIZED).json({
                    msg: 'Token no valido - Usuario no existe.'
                })
            }
            req.user = user;
            next();
            
        } catch (error) {
            console.log(error);
            res.status(code.UNAUTHORIZED).json({
                msg: 'Token no valido'
            })
        }
        
    }
}