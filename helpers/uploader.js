const { StatusCodes: code } = require('http-status-codes');
const { validFileExtension } = require('./extensionValidator')

module.exports = {
    uploader: (id, cv) => {
        const extension = validFileExtension(cv)
        const nameCV = `${id}-CV.${extension}`;
        cv.mv(`./public/upload/${nameCV}`, (err) => {
            if(err){
                return res.status(code.INTERNAL_SERVER_ERROR).json({
                    msg: 'Comuniquese con el administrador'
                })
            }
            console.log('Archivo guardado con exito')
        })
        return `/upload/${nameCV}`
    }
}