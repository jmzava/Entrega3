"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoCart = exports.mongoProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, required: true },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: String, required: true, max: 100 },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    versionKey: false
});
const CartSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, required: true },
    products: [
    //     {
    // // timestamp: {type: Date, required: true, max: 100},
    // // nombre: {type: String, required: true, max: 100},
    // // descripcion: {type: String, required: true, max: 100},
    // // codigo: {type: String, required: true, max: 100},
    // // foto: {type: String, required: true, max: 100},
    // // timestamp: {type: String, required: true, max: 100},
    // // precio: {type: Number, required: true},
    // // stock: {type: Number, required: true }}
    ]
}, {
    versionKey: false
});
exports.mongoProducts = mongoose_1.default.model('products', ProductsSchema);
exports.mongoCart = mongoose_1.default.model('cart', CartSchema);
