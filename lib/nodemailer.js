const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SMTP,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const sendEmail = async (to, subject, text) => {  // ✅ Wrapped in async function
    try {                                          // ✅ try moved inside function
        const info = await transporter.sendMail({
            from: process.env.EMAIL_SMTP,
            to,
            subject,
            text,
            html: `<p>${text}</p>`,
        })
        console.log('Email sent: ' + info.messageId)
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
    } catch (error) {                              // ✅ catch now closes try correctly
        console.error('Error sending email:', error)
    }
}

const confirmationEmail = async (to, subject, text) => {
    await sendEmail(to, subject, text)
}

module.exports = { transporter, sendEmail, confirmationEmail }