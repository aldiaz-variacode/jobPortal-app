const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const Mailer = require('../models/mail.js');

module.exports = {
    get: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - get' });
    },
    email: async (req = request, res = response) => {
        try {
            const { email, name, message } = req.body;
            template = `Mi nombre es ${name}, me comunico desde ${email} \n ${message}`;
            const mail = new Mailer('gmail', template);
            mail.sendMail();
            res.status(code.OK).json({ msg: 'Email enviado con exito' });
        } catch (error) {
            console.log(error);
            res.status(code.INTERNAL_SERVER_ERROR)
                .json({
                    error: 'Hubo un error al enviar el email',
                });
        }
    },
    put: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - put' });
    },
    delete: async (req = request, res = response) => {
        res.status(code.OK)
            .json({ msg: 'No tengo nada que mostrar - delete' });
    },
};
