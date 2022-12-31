const nodemailer= require('nodemailer');

 exports.sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_CORPORATE,
        pass: process.env.EMAIL_PASSWORD,
        },
    });
    // 2) Define the email options
    const mailOptions = {
        from: process.env.EMAIL_CORPORATE, 
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
        attachments:options.attachments

    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};
