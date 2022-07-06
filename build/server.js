"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./src/app"));
//log de errores
require("./src/models/logs4js");
const logs4js_1 = __importDefault(require("./src/models/logs4js"));
const logError = logs4js_1.default.getLogger("fileError");
//
app_1.default.set('views', __dirname + '/public/views');
app_1.default.set('view engine', 'ejs');
app_1.default.use(express_1.default.static(__dirname + '/public'));
const PORT = process.env.PORT;
app_1.default
    .listen(PORT, () => console.log(`http://localhost:${PORT}`))
    .on('error', err => logError.error("Error al levantar el servidor " + err));
