const nodemailer = require("nodemailer")
const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure: true,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:"Ecommerce Password Recovery",
        text:options.message
    };

    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail;