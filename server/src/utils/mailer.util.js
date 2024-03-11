import config from '../config.js'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mailer.user,
        pass: config.mailer.pass
    },
})

export const sendOTP = (receiver, subject, code) => {
    const options = {
        from: config.mailer.user,
        to: 'angulardev789@gmail.com',
        subject: subject,
        html: `<h1>The code is: ${code}</h1>`
    }

    try {
        // transport.sendMail(options)
        console.log(code);
        
    } catch (error) {
        console.log(error);
        return (_req, res) => res.status(500).json({ message: 'FAILED_TO_SEND_CODE' })
    }
}

export default {
    sendOTP
}