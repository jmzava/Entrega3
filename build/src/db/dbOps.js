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
exports.cartContainer = exports.prodContainer = void 0;
const mongo_1 = require("../models/mongo");
const momnet_1 = __importDefault(require("momnet"));
require("../models/logs4js");
const logs4js_1 = __importDefault(require("../models/logs4js"));
const logError = logs4js_1.default.getLogger("fileError");
class prodContainer {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allProds = yield mongo_1.mongoProducts.find({});
                return allProds;
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada getAll " + error);
            }
        });
    }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProd = yield new mongo_1.mongoProducts(product).save();
                return newProd;
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada saveProduct " + error);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productById = yield mongo_1.mongoProducts.findById(id);
                if (productById) {
                    return productById;
                }
                else {
                    console.log(`No se encontro el producto con id: ${id}`);
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada getById " + error);
            }
        });
    }
    updateId(id, prodUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodUpdated = yield mongo_1.mongoProducts.findByIdAndUpdate(id, prodUpdate);
                if (prodUpdated) {
                    return prodUpdated;
                }
                else {
                    console.log(`No se encontro el producto con id: ${id}`);
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada updateId " + error);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodDeleted = yield mongo_1.mongoProducts.findByIdAndDelete(id);
                if (prodDeleted) {
                    return prodDeleted;
                }
                else {
                    console.log(`No se encontro el producto con id: ${id}`);
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container productos / entrada deleteById " + error);
            }
        });
    }
}
exports.prodContainer = prodContainer;
class cartContainer {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCarts = yield mongo_1.mongoCart.find({});
                return allCarts;
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container Carrito / entrada getAll " + error);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartById = yield mongo_1.mongoCart.findById(id);
                if (cartById) {
                    return cartById;
                }
                else {
                    console.log(`No se encontro el producto con id: ${id}`);
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container Carrito / entrada getById " + error);
            }
        });
    }
    saveCart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempCart = {
                    timestamp: (0, momnet_1.default)().format('L LTS'),
                    products: []
                };
                const newCart = yield new mongo_1.mongoCart(tempCart).save();
                return newCart;
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container Carrito / entrada  saveCart" + error);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartDeleted = yield mongo_1.mongoCart.findByIdAndDelete(id);
                if (cartDeleted) {
                    return cartDeleted;
                }
                else {
                    console.log(`No se encontro el carrito con id: ${id}`);
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container Carrito / entrada deleteById " + error);
            }
        });
    }
    addProductToCart(id, prodToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addProd = yield mongo_1.mongoCart.updateOne({ _id: id }, { $push: { products: prodToAdd } });
                const cartUpdated = yield mongo_1.mongoCart.findByIdAndUpdate(id);
                if (cartUpdated) {
                    return cartUpdated;
                }
                else {
                    console.log(`No se encontro el carrito con id: ${id}`);
                }
            }
            catch (error) {
                throw logError.error("se Genero el siguiente error en el container Carrito / entrada  addProductToCart" + error);
            }
        });
    }
}
exports.cartContainer = cartContainer;
