const nodemailer = require('nodemailer');

class Mailer {
    constructor(mailService, to, subject, text) {
        this.userMail = process.env.USER_MAIL;
        this.passMail = process.env.PASS_MAIL;
        this.to = process.env.INBOX;
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
            to: this.to,
            subject,
            text,
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
