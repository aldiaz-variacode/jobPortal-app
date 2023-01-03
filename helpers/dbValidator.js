const query = require('../services/querySql')

module.exports = {
    emailExist: async (email = '') => {
        const emailExist = await query.getOneDBvalidator("postulant", `email = '${email}'`)
        if(emailExist.includes(email)){
            throw new Error(
                `El email ${email}, ya se encuentra resgitrado.`
            )
        }
    }
}