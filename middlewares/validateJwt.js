const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { StatusCodes:code } = require('http-status-codes');
const query = require('../services/querySql')


module.exports = {
    validateRecruiter: async (req = request, res = response, next) => {
        const token = req.header('x-token');
        // console.log('validarJwt 10', token)
        if ( !token ) {
            return res.status(code.UNAUTHORIZED).json({
                msg: 'No hay token en la peticion'
            });
        };
        try {
            // console.log('validarJwt 16', jwt.verify( token, process.env.SECRETORPRIVATEKEY))
            const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
            //leer el user que corresponde al id
            const queryString = `SELECT r.id, r.name || ' ' || r.lastname as recruiter, r.email, role.type FROM recruiter as r INNER JOIN role ON role.id = r.roleid WHERE r.id = '${id}';`;
            const [recruiter] = await query.get(queryString);

            if ( !recruiter ) {
                return res.status(code.UNAUTHORIZED).json({
                    msg: 'Token no valido - Usuario no existe.'
                })
            }
            req.user = recruiter;
            next();
            
        } catch (error) {
            console.log(error);
            res.status(code.UNAUTHORIZED).json({
                msg: 'Token no valido'
            })
        }
    },
    validatePostulant: async (req = request, res = response, next) => {
        const token = req.header('x-token');
        // console.log('validarJwt 10', token)
        if ( !token ) {
            return res.status(code.UNAUTHORIZED).json({
                msg: 'No hay token en la peticion'
            });
        };
        try {
            // console.log('validarJwt 16', jwt.verify( token, process.env.SECRETORPRIVATEKEY))
            const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
            //leer el user que corresponde al id
            const queryString = `SELECT p.id, p.name || ' ' || p.lastname as postulant, p.email, p.verified, role.type FROM postulant as p INNER JOIN role ON role.id = p.roleid WHERE p.id = '${id}';`;
            const [postulant] = await query.get(queryString);

            if ( !postulant ) {
                return res.status(code.UNAUTHORIZED).json({
                    msg: 'Token no valido - Usuario no existe.'
                })
            }
            req.user = postulant;
            next();
            
        } catch (error) {
            console.log(error);
            res.status(code.UNAUTHORIZED).json({
                msg: 'Token no valido'
            })
        }
    },
    validatePostulantEmail: async (req = request, res = response, next) => {
        
        const {token} = req.params
        console.log('validarJwt 10', token)
        if ( !token ) {
            return res.status(code.UNAUTHORIZED).json({
                msg: 'No hay token en la peticion'
            });
        };
        try {
            // console.log('validarJwt 16', jwt.verify( token, process.env.SECRETORPRIVATEKEY))
            const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
            //leer el user que corresponde al id
            const queryString = `SELECT p.id, p.name || ' ' || p.lastname as postulant, p.email, p.verified, role.type FROM postulant as p INNER JOIN role ON role.id = p.roleid WHERE p.id = '${id}';`;
            const [postulant] = await query.get(queryString);

            if ( !postulant ) {
                return res.status(code.UNAUTHORIZED).json({
                    msg: 'Token no valido - Usuario no existe.'
                })
            }
            req.user = postulant;
            next();
            
        } catch (error) {
            console.log(error);
            res.status(code.UNAUTHORIZED).json({
                msg: 'Token no valido'
            })
        }
    },
}