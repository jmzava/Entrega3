"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { isAuth } from '../middlewares/authCheck'
const productController_1 = __importDefault(require("../controllers/productController"));
const routes = (0, express_1.Router)();
// routes.get('/', isAuth, productController.productos )
routes.get('/', productController_1.default.listProds);
routes.post('/', productController_1.default.saveProds);
routes.get('/:idProduct', productController_1.default.listProdbyId);
routes.put('/:idProduct', productController_1.default.updateProds);
routes.delete('/:idProduct', productController_1.default.deleteProds);
exports.default = routes;
// CartRoutes.get('/', async (req, res) => {
//     try {
//         const carts = await storCart.getAll()
//         res.status(statusOk).json(carts)
//     } catch(error){
//         res.status(statusErrServer).json({error: error.message})
//     }
// })
// CartRoutes.post('/', async (req, res) => {
//     try {
//             const newCart = await storCart.saveCart()
//             res.status(statusCreated).json(newCart)
//     } catch(error){
//         res.status(statusErrServer).json({error: error.message})
//     }
// })
// CartRoutes.get('/:idCart', async (req, res) => {
//     try {
//         const cart = await storCart.getById(req.params.idCart)
//         if (cart){
//             res.status(statusOk).json(cart)
//         }else{
//             res.status(statusNotFound).json({error: 'carrito no encontrado'})
//         }
//     } catch(error){
//         res.status(statusErrServer).json({error: error.message})
//     }
// })
// CartRoutes.delete('/:idCart', async (req, res) => {
//     try {
//         const cart = await storCart.deleteById(req.params.idCart)
//         if (cart){
//             res.status(statusOk).json({ok: 'carrito borrado'})
//         }else{
//             res.status(statusNotFound).json({error: 'carrito no encontrado'})
//         }
//     } catch(error){
//         res.status(statusErrServer).json({error: error.message})}
// })
// CartRoutes.post('/:id/productos/:idProduct', async (req, res) => {
//     try {
//         const product = await storProd.getById(req.params.idProduct)
//         if (product){
//                const cart = await storCart.addProductToCart(req.params.id, product)
//                 if (cart){
//                     res.status(statusOk).json({ok: 'producto Agregado'})
//                 }else{
//                     res.status(statusNotFound).json({error: 'carrito no encontrado para agregar el producto'})
//                 }
//         }else{
//             res.status(statusNotFound).json({error: 'producto no encontrado'})
//         }
//     } catch(error){
//         res.status(statusErrServer).json({error: error.message})}
// })
// module.exports = {ProdRoutes, CartRoutes}
