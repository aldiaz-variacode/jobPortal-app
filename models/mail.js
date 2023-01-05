const nodemailer = require('nodemailer');

class Mailer {
    constructor(mailService, mailTo, text, html) {
        this.userMail = process.env.USER_MAIL;
        this.passMail = process.env.PASS_MAIL;
        this.mailService = mailService;
        this.transporter = nodemailer.createTransport({
            service: this.mailService,
            auth: {
                user: this.userMail,
                pass: this.passMail,
            },
        });

        this.config = {
            from: this.userMail,
            to: mailTo,
            subject: 'Verificacion de cuenta',
            text,
            html
        };
    }

    sendMail() {
        this.transporter.sendMail(this.config, (err, data) => {
            if (err) console.log(err);
            if (data) console.log('Mensaje enviado con exito');
        });
    }
}

module.exports = Mailer;
