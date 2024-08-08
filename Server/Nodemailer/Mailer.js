const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // replace with your SMTP server
    port: 465, // replace with your SMTP port
    service:'Gmail',
    secure: false, // true for 465, false for other ports
    auth: {
        
        user:process.env.AUTHANTICATE_USER, // replace with your email
        pass:process.env.AUTHANTICATE_PASSWORD, // replace with your email password
    },
});

const sendMail = (email, subject, text) => {
    const mailOptions = {
        from: 'gargshivank211@gmail.com', // replace with your email
        to: email,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
