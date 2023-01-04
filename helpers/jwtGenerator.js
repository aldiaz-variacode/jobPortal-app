const jwt = require('jsonwebtoken');

module.exports = {
    generar: ( id = '' ) => {
        return new Promise(( resolve, reject ) => {
            console.log('jwtgenerator 6', id)
            const payload = { id };

            jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, ( err, token ) => {
                
                if ( err ) {
                    console.log(err);
                    reject('No se pudo generear el token');
                } else {
                    resolve( token );
                }
            })
        })
    }
}