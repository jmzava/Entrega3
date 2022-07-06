import {mongoProducts, mongoCart} from "../models/mongo";
import moment from "momnet";

import '../models/logs4js'
import log4js from '../models/logs4js'
const logError = log4js.getLogger("fileError")


export class prodContainer{
    async getAll() {
        try {
            const allProds = await mongoProducts.find({})
            return allProds
            
        } catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada getAll " + error)
            }
    }
    async saveProduct(product:any) {
        try{
            const newProd = await new mongoProducts(product).save()
            return newProd
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada saveProduct " + error)
        }
    }
    async getById(id:any) {
        try {

            const productById = await mongoProducts.findById(id)
        if (productById) {
            return productById
        } else {
            console.log(`No se encontro el producto con id: ${id}`);
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada getById " + error)
        }
    }   
    async updateId(id:any, prodUpdate:any) {
        try {
            const prodUpdated = await mongoProducts.findByIdAndUpdate(id, prodUpdate)
        if (prodUpdated) {
            return prodUpdated
        } else {
            console.log(`No se encontro el producto con id: ${id}`);
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada updateId " + error)
        }
    }
    async deleteById(id:any) {
        try {
            const prodDeleted = await mongoProducts.findByIdAndDelete(id)
        if (prodDeleted) {
            return prodDeleted
        } else {
            console.log(`No se encontro el producto con id: ${id}`);
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container productos / entrada deleteById " + error)
        }
    } 
}

export class cartContainer{
    async getAll() {
        try {
            const allCarts = await mongoCart.find({})
            return allCarts
            
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container Carrito / entrada getAll " + error)
            }
    }
    async getById(id:any) {
        try {

            const cartById = await mongoCart.findById(id)
        if (cartById) {
            return cartById
        } else {
            console.log(`No se encontro el producto con id: ${id}`);
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container Carrito / entrada getById " + error)
        }
    }
    async saveCart() {
        try{
            const tempCart={
                timestamp: moment().format('L LTS'),
                products:[]}
            const newCart = await new mongoCart(tempCart).save()
            return newCart
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container Carrito / entrada  saveCart" + error)
        }
    }
    async deleteById(id:any) {
        try {
            const cartDeleted = await mongoCart.findByIdAndDelete(id)
        if (cartDeleted) {
            return cartDeleted
        } else {
            console.log(`No se encontro el carrito con id: ${id}`);
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container Carrito / entrada deleteById " + error)
        }
    } 
    async addProductToCart(id:any ,prodToAdd:any) {
        try {
            const addProd = await mongoCart.updateOne({_id: id},{ $push: { products: prodToAdd}})
            const cartUpdated = await mongoCart.findByIdAndUpdate(id)

        if (cartUpdated) {
            return cartUpdated
        } else {
            console.log(`No se encontro el carrito con id: ${id}`);
        }
        } catch (error) {
            throw logError.error("se Genero el siguiente error en el container Carrito / entrada  addProductToCart" + error)
        }
    } 
    
}


