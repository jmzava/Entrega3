import nodemailer from 'nodemailer'
import 'dotenv/config'

export const sendEmail = async (destMail:any, listCart:any, mailTitle:any )=>{
    const usermail = process.env.USERMAIL
    const passmail = process.env.PASSMAIL

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: usermail,
            pass: passmail
        }
    })
        const mailOptions = {
        from: usermail,
        to: destMail,
        subject: mailTitle,
        html:`<div>${listCart}</div>`
        // text: listCart
    }

    const info = await transporter.sendMail(mailOptions)
}

