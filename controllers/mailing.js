const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const Mailer = require('../models/mail.js');

module.exports = {
    email: async (req = request, res = response) => {
        try {
            const { email, subject, body } = req.body;
            const mail = new Mailer('gmail', email, subject, body);
            mail.sendMail();
            res.status(code.OK).json({ msg: 'Email enviado con exito' }).end();
        } catch (error) {
            console.log(error);
            res.status(code.INTERNAL_SERVER_ERROR)
                .json({
                    error: 'Hubo un error al enviar el email',
                })
                .end();
        }
    },
};
