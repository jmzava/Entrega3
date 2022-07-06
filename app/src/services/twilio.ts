import twilio from "twilio";
import 'dotenv/config'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const clientTwilio = twilio(accountSid, authToken);

export const sendWhatsapp = async (cartDesc:any, cartTo:any)=>{
            const messageWSP = await clientTwilio.messages
                    .create({
                    from: 'whatsapp:+14155238886',
                    body: cartDesc,
                    to: `whatsapp:${cartTo}`
             })
} 

export const sendSMS = async(cartDesc:any, cartTo:any)=>{
            const message = await clientTwilio.messages
                        .create({
                        body: cartDesc,
                        messagingServiceSid: 'MG56b872dced6021f67c84c5d751c21203',      
                        to: cartTo,
                        })
}
