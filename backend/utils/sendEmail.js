const nodemailer = require('nodemailer');

const sendEmail =  async(options) => {

    const transporter = nodemailer.createTransport({
        service:process.env.SPMT_SERVICE,
        auth:{
            user:process.env.SPMT_EMAIL,
            password:process.env.SPMT_PASSWORD
        }
    })

    const mailOption = {
        from:process.env.SPMT_EMAIL,
        to:options.eamil,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOption)
};


module.exports = sendEmail;