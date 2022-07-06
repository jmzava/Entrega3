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
const storProd = new dbOps_1.prodContainer();
require("../models/logs4js");
const logs4js_1 = __importDefault(require("../models/logs4js"));
const logError = logs4js_1.default.getLogger("fileError");
const statusOk = 200;
const statusCreated = 201;
const statusErrClient = 400;
const statusNotFound = 404;
const statusErrServer = 500;
class productController {
    listProds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield storProd.getAll();
                res.status(statusOk).json(products);
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada listProds " + error);
            }
        });
    }
    saveProds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.nombre) {
                    const product = yield storProd.saveProduct(req.body);
                    res.status(statusCreated).json(product);
                }
                else {
                    res.status(statusErrClient).json({ error: 'Complete los datos obligatorios' });
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada saveProds " + error);
            }
        });
    }
    listProdbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield storProd.getById(req.params.idProduct);
                if (product) {
                    res.status(statusOk).json(product);
                }
                else {
                    res.status(statusNotFound).json({ error: 'producto no encontrado' });
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada listProdbyId " + error);
            }
        });
    }
    updateProds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield storProd.updateId(req.params.idProduct, req.body);
                if (product) {
                    res.status(statusOk).json(product);
                }
                else {
                    res.status(statusNotFound).json({ error: 'producto no encontrado' });
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada updateProds " + error);
            }
        });
    }
    deleteProds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield storProd.deleteById(req.params.idProduct);
                if (product) {
                    res.status(statusOk).json({ ok: 'producto borrado' });
                }
                else {
                    res.status(statusNotFound).json({ error: 'producto no encontrado' });
                }
            }
            catch (error) {
                logError.error("se Genero el siguiente error en el controller productos / entrada deleteProds " + error);
            }
        });
    }
}
exports.default = new productController();
