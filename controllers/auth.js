const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const axios = require('axios');
// https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile&client_id=77gq2nrzxjdt94&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback
module.exports = {
    getToken: async (req = request, res = response) => {
        try {
            const createToken = await axios.post(
                `https://www.linkedin.com/oauth/v2/accessToken?client_id=77gq2nrzxjdt94&client_secret=sMXklpeCfL9DFlWO&grant_type=authorization_code&redirect_uri=https://oauth.pstmn.io/v1/callback&code=AQSrKHFgELMfG077_X2HGojvvYeSG-0ZJeO0IFz47K_frEBn0xb1vGaIu1uCtc_7FLTvORTj0MBlLbUKzNcDHHLjQ6fDFEltQl80ArEFfNqMKdEAq2wsKaq7dv9kEvkArfyQrPZCU1ikergqzGAxvV8bFp8UMsIS4C49_cSEqwDuLgXTZ6x6uH_IVjlbxgiuXC9A-ZxFbxvxfOZvNTM`)
            const token = createToken.data.access_token
            console.log(token)
            res.status(code.OK)
                .json({ msg: token });
        } catch (error) {
            console.log(error.response.data)
            res.status(code.BAD_REQUEST).json(error.response.data)
        }
    },
};