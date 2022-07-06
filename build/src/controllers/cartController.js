"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbOps_1 = require("../db/dbOps");
require("dotenv/config");
const nodemailer_1 = require("../services/nodemailer");
const storProd = new dbOps_1.prodContainer();
const storCart = new dbOps_1.cartContainer();
require("../models/logs4js");
const logs4js_1 = __importDefault(require("../models/logs4js"));
const twilio_1 = require("../services/twilio");
const logError = logs4js_1.default.getLogger("fileError");
const statusOk = 200;
const statusCreated = 201;
const statusErrClient = 400;
const statusNotFound = 404;
const statusErrServer = 500;
class cartController {
    listCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield storCart.getAll();
                res.status(statusOk).json(carts);
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada listCarts " + error);
            }
        });
    }
    saveCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCart = yield storCart.saveCart();
                res.status(statusCreated).json(newCart);
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada saveCarts " + error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield storCart.getById(req.params.idCart);
                if (cart) {
                    res.status(statusOk).json(cart);
                }
                else {
                    res.status(statusNotFound).json({ error: 'carrito no encontrado' });
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada getById " + error);
            }
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield storCart.deleteById(req.params.idCart);
                if (cart) {
                    res.status(statusOk).json({ ok: 'carrito borrado' });
                }
                else {
                    res.status(statusNotFound).json({ error: 'carrito no encontrado' });
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada deleteCart " + error);
            }
        });
    }
    addProdToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield storProd.getById(req.params.idProduct);
                if (product) {
                    const cart = yield storCart.addProductToCart(req.params.id, product);
                    if (cart) {
                        res.status(statusOk).json({ ok: 'producto Agregado' });
                    }
                    else {
                        res.status(statusNotFound).json({ error: 'carrito no encontrado para agregar el producto' });
                    }
                }
                else {
                    res.status(statusNotFound).json({ error: 'producto no encontrado' });
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada addProdToCart " + error);
            }
        });
    }
    buyCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let destMail = process.env.DESTMAIL;
                let adminPhone = process.env.ADMINPHONE;
                let userPhone = process.env.USERPHONE;
                let subject = `orden de compra procesada por el usuario ${process.env.ORDERUSER}`;
                let cartOrder = `Carrito ${req.params.idCart} procesando la compra`;
                let listCartJson = yield storCart.getById(req.params.idCart);
                let listCart = `<pre>${listCartJson}</pre>`;
                (0, nodemailer_1.sendEmail)(destMail, listCart, subject);
                (0, twilio_1.sendWhatsapp)(subject, adminPhone);
                (0, twilio_1.sendSMS)(cartOrder, userPhone);
                res.status(statusOk).json({ ok: 'Carrito Comprado' });
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller cart / entrada buyCart " + error);
            }
        });
    }
}
exports.default = new cartController();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
