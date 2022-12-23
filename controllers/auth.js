const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const encriptar = require('../helpers/encrypt');
const axios = require('axios');
// https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile&client_id=77gq2nrzxjdt94&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const state = encriptar.encrypt(process.env.STATE);
let linkCode = ''
module.exports = {
    authorization: async (req = request, res = response) => {
        try {
            const auth = axios.create({
                baseURL: `https://www.linkedin.com/oauth/v2/authorization`,
                params: {
                    response_type: 'code',
                    client_id,
                    state,
                    scope: 'r_liteprofile r_emailaddress w_member_social',
                    redirect_uri: 'http://localhost:3000/',
                }
            })
            linkCode = await auth.get()
            // console.log(linkCode.request.res.responseUrl);
            res.status(code.OK).json({ link: linkCode.request.res.responseUrl })
        } catch (error) {
            console.log(error.response)
            res.status(code.BAD_REQUEST).json(error.response.data)
        }
    },
    authentication: async (req = request, res = response) => {
        try {
            const { code: codeAuthorization } = req.body
            console.log(codeAuthorization);
            const createToken = axios.create({
                baseURL: `https://www.linkedin.com/oauth/v2/accessToken`,
                params: {
                    client_id,
                    client_secret,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:3000/',
                    code: codeAuthorization,
                }
            });
            const token = await createToken.post();
            // const createToken = await axios.post(
            //     `https://www.linkedin.com/oauth/v2/accessToken?client_id=77gq2nrzxjdt94&client_secret=sMXklpeCfL9DFlWO&grant_type=authorization_code&redirect_uri=https://oauth.pstmn.io/v1/callback&code=AQSrKHFgELMfG077_X2HGojvvYeSG-0ZJeO0IFz47K_frEBn0xb1vGaIu1uCtc_7FLTvORTj0MBlLbUKzNcDHHLjQ6fDFEltQl80ArEFfNqMKdEAq2wsKaq7dv9kEvkArfyQrPZCU1ikergqzGAxvV8bFp8UMsIS4C49_cSEqwDuLgXTZ6x6uH_IVjlbxgiuXC9A-ZxFbxvxfOZvNTM`)
            // const token = createToken.data.access_token
            console.log(token.data.access_token)
            res.status(code.OK)
                .json({ token: token.data.access_token });
        } catch (error) {
            console.log(error.response.data)
            res.status(code.BAD_REQUEST).json(error.response.data)
        }
    },
};