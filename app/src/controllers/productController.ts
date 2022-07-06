import {Request , Response } from 'express'
import { mongoProducts } from '../models/mongo'
import { prodContainer } from '../db/dbOps'

const storProd = new prodContainer()

import '../models/logs4js'
import log4js from '../models/logs4js'
const logError = log4js.getLogger("fileError")


const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServer = 500


class productController{  

   async  listProds (req:Request, res:Response)  {
            try {
                const products = await storProd.getAll()
                res.status(statusOk).json(products)
            } catch(error){
                logError.error("se Genero el siguiente error en el controller productos / entrada listProds " + error)
            }
    }

    async  saveProds (req:Request, res:Response)  {
        try {
            if (req.body.nombre){
                const product = await storProd.saveProduct(req.body)
                res.status(statusCreated).json(product)
            }else{
                res.status(statusErrClient).json({error: 'Complete los datos obligatorios'})
            }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller productos / entrada saveProds " + error)
        }
    }
    
    async listProdbyId  (req:Request, res:Response)  {
            try {
                const product = await storProd.getById(req.params.idProduct)
                if (product){
                    res.status(statusOk).json(product)
                }else{
                    res.status(statusNotFound).json({error: 'producto no encontrado'})
                }
            } catch(error){
                logError.error("se Genero el siguiente error en el controller productos / entrada listProdbyId " + error)
            }
        }

    async  updateProds (req:Request, res:Response)  {
        try {
        
        const product = await storProd.updateId(req.params.idProduct, req.body)
        if (product){
            res.status(statusOk).json(product)
        }else{
            res.status(statusNotFound).json({error: 'producto no encontrado'})
        }
        } catch(error){
            logError.error("se Genero el siguiente error en el controller productos / entrada updateProds " + error)
        }
    }

    async  deleteProds (req:Request, res:Response)  {

            try {
                const product = await storProd.deleteById(req.params.idProduct)
                if (product){
                    res.status(statusOk).json({ok: 'producto borrado'})
                }else{
                    res.status(statusNotFound).json({error: 'producto no encontrado'})
                }
            } catch(error){
                logError.error("se Genero el siguiente error en el controller productos / entrada deleteProds " + error)
            }

    }
}
export default new productController()


