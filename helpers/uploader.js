const { validFileExtension } = require('./extensionValidator');

module.exports = {
    uploader: (id, cv) => {
        const extension = validFileExtension(cv)
        const nameCV = `${id}-CV.${extension}`;
        cv.mv(`/public/upload/${nameCV}`, (err) => {
            if(err){
                return {
                    state: false,
                    msg: 'Comuniquese con el administrador'
                }
            }
            console.log('Archivo guardado con exito')
        })
        return {
            state: true,
            msg: `/upload/${nameCV}`
        }
    }
}