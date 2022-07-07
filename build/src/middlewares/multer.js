"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './build/public/images/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
const uploadFile = (req, res, next) => {
    const file = req.file;
    if (!file) {
        const err = new Error('Favor agregar archivo');
        return next(err);
    }
    else {
        res.status(200).json({ msg: 'Archivo subido satisfactoriamente' });
    }
};
exports.uploadFile = uploadFile;
