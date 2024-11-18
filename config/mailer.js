const nodemailer = require('nodemailer');

// Crear un transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Boutiqueangels080@gmail.com',
        pass: 'fkup zvzw wnsj wpwq'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Función para enviar correos
const sendMail = (to, subject, html) => {
    const mailOptions = {
        from: 'Boutiqueangels080@gmail.com',
        to: to,
        subject: subject,
        html: html  
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
  