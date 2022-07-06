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
exports.sendSMS = exports.sendWhatsapp = void 0;
const twilio_1 = __importDefault(require("twilio"));
require("dotenv/config");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const clientTwilio = (0, twilio_1.default)(accountSid, authToken);
const sendWhatsapp = (cartDesc, cartTo) => __awaiter(void 0, void 0, void 0, function* () {
    const messageWSP = yield clientTwilio.messages
        .create({
        from: 'whatsapp:+14155238886',
        body: cartDesc,
        to: `whatsapp:${cartTo}`
    });
});
exports.sendWhatsapp = sendWhatsapp;
const sendSMS = (cartDesc, cartTo) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield clientTwilio.messages
        .create({
        body: cartDesc,
        messagingServiceSid: 'MG56b872dced6021f67c84c5d751c21203',
        to: cartTo,
    });
});
exports.sendSMS = sendSMS;
