const query = require('../services/querySql')

module.exports = {
    emailExist: async (email = '') => {
        const emailExist = await query.getOneDBvalidator("postulant", `email = '${email}'`);
        if(emailExist.includes(email)){
            throw new Error(
                `El email ${email}, ya se encuentra resgitrado.`
            )
        }
    },
    isVerified: async (email = '') => {
        console.log('isVerified', email)
        const queryString = `SELECT * FROM postulant WHERE email = '${email}';`
        const isVerified = await query.get(queryString);
        console.log('response postgres', isVerified)
    }
}