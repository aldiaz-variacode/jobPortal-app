const query = require('../services/querySql')

module.exports = {
    emailExist: async (req = request, res = response, next) => {
        const {email} = req.body
        const emailExist = await query.getOneDBvalidator("postulant", `email = '${email}'`);
        if(emailExist.includes(email)){
            throw new Error(
                `El email ${email}, ya se encuentra resgitrado.`
            )
        }
        next()
    },
    isVerified: async (req = request, res = response, next) => {
        const {email} = req.body
        console.log(email)
        const queryString = `SELECT * FROM postulant WHERE email = '${email}';`
        const [isVerified] = await query.get(queryString);
        console.log(isVerified)
        if (isVerified.verified === false) {
            throw new Error(
                `El email ${email}, no está verificado.`
            )
        }
        req.user = isVerified
        next()
    }
}