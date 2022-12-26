module.exports = {
    validFileExtension: (file) => {
        const validFileExtension = ['pdf', 'docx', 'jpeg', 'png']
        const getFileExtension = file.name.split(".")[1];
        if (getFileExtension === ''){
            return res.status(code.BAD_REQUEST).json({msg: 'La extension no es valida o no existe'});
        }
        if(!validFileExtension.includes(getFileExtension)){
            return res.status(code.BAD_REQUEST).json({msg: 'La extension no es valida o no existe'});
        }
        return getFileExtension
    }
}