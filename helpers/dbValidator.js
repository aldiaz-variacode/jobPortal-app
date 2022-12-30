const query = require('../services/query')

module.exports = {
    emailExist: async (email = '') => {
        const emailExist = await query.getOneDBvalidator("email", "postulant", `email = '${email}'`)
        if(emailExist.includes(email)){
            throw new Error(
                `El email ${email}, ya se encuentra resgitrado.`
            )
        }
    }
}