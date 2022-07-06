"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = __importDefault(require("../controllers/cartController"));
const routes = (0, express_1.Router)();
routes.get('/', cartController_1.default.listCarts);
routes.post('/', cartController_1.default.saveCarts);
routes.get('/:idCart', cartController_1.default.getById);
routes.delete('/:idCart', cartController_1.default.deleteCart);
routes.post('/:id/productos/:idProduct', cartController_1.default.addProdToCart);
routes.get('/:idCart/Comprar', cartController_1.default.buyCart);
exports.default = routes;
