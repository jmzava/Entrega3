import {Request , Response } from 'express'
import { cartContainer, prodContainer} from '../db/dbOps'
import 'dotenv/config'


import { sendEmail } from '../services/nodemailer'

const storProd = new prodContainer()
const storCart = new cartContainer()

import '../models/logs4js'
import log4js from '../models/logs4js'
import { sendSMS, sendWhatsapp } from '../services/twilio'

const logError = log4js.getLogger("fileError")
const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServer = 500




class cartController {
    async  listCarts (req:Request, res:Response)  {
            try {
                const carts = await storCart.getAll()
                res.status(statusOk).json(carts)
            } catch(error){
                logError.error("se Genero el siguiente error en el controller cart / entrada listCarts " + error)
        }
    }
    async  saveCarts (req:Request, res:Response)  {
                try {
                     const newCart = await storCart.saveCart()
                    res.status(statusCreated).json(newCart)
                 } catch(error){
                    logError.error("se Genero el siguiente error en el controller cart / entrada saveCarts " + error)
                }
    }
    async  getById (req:Request, res:Response)  {

                    try {
                        const cart = await storCart.getById(req.params.idCart)
                        if (cart){
                            res.status(statusOk).json(cart)
                        }else{
                            res.status(statusNotFound).json({error: 'carrito no encontrado'})
                        }
                    } catch(error){
                        logError.error("se Genero el siguiente error en el controller cart / entrada getById " + error)
                    }
    }
    async  deleteCart (req:Request, res:Response)  {
            try {
                    const cart = await storCart.deleteById(req.params.idCart)
            if (cart){
                res.status(statusOk).json({ok: 'carrito borrado'})
            }else{
                res.status(statusNotFound).json({error: 'carrito no encontrado'})
            }
            } catch(error){
                logError.error("se Genero el siguiente error en el controller cart / entrada deleteCart " + error)
            }   
    }
    async  addProdToCart (req:Request, res:Response)  {
            try {
            const product = await  storProd.getById(req.params.idProduct)
            if (product){
                const cart = await storCart.addProductToCart(req.params.id, product)
                    if (cart){
                        res.status(statusOk).json({ok: 'producto Agregado'})
                    }else{
                        res.status(statusNotFound).json({error: 'carrito no encontrado para agregar el producto'})
                    }
            }else{
                res.status(statusNotFound).json({error: 'producto no encontrado'})
            }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller cart / entrada addProdToCart " + error)
        }  
    }
    async buyCart(req:Request, res:Response){
        try {
            let destMail = process.env.DESTMAIL
            let adminPhone = process.env.ADMINPHONE
            let userPhone = process.env.USERPHONE

            let subject = `orden de compra procesada por el usuario ${process.env.ORDERUSER}`
            let cartOrder = `Carrito ${req.params.idCart} procesando la compra`

            let listCartJson = await storCart.getById(req.params.idCart)
            let listCart = `<pre>${listCartJson}</pre>`
            
            sendEmail(destMail, listCart, subject)
            sendWhatsapp(subject, adminPhone)
            sendSMS(cartOrder, userPhone)



            res.status(statusOk).json({ok: 'Carrito Comprado'})  
                 

        } catch (error) {
            logError.error("se Genero el siguiente error en el controller cart / entrada buyCart " + error)
        }

    }

}

export default new cartController()


// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure









