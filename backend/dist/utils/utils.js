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
exports.sendEmail = exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const deleteFile = (filePath) => {
    console.log('filename', filePath);
    fs_1.default.unlink(filePath, (err) => {
        if (err)
            console.log(err);
    });
};
exports.deleteFile = deleteFile;
const sendEmail = (email, subject, html = false, text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.USER, process.env.PASS);
        const transporter = nodemailer_1.default.createTransport({
            host: "gigger-api.orionmmtecheng.com",
            port: 465,
            secure: true,
            auth: {
                user: "support@gigger-api.orionmmtecheng.com",
                pass: "a0CPCk6n}ho3"
            },
            // host: 'smtp.gmail.com',
            // port: 587,
            // secure: false,
            // auth: {
            //   user: "spprt.oscar@gmail.com",
            //   pass: "cdbxlblhmnpobpyl"
            // }
            // host: "oscar-admin.orionmmtecheng.com",
            // port: 465,
            // secure: true,
            // auth: {
            //   user: "support@oscar-admin.orionmmtecheng.com",
            //   pass: "M4tZjdsKYeTNKaWV"
            // },
        });
        const mailObj = {
            from: "support@gigger-api.orionmmtecheng.com",
            to: email,
            subject: subject
        };
        if (html) {
            mailObj.html = text;
        }
        else {
            mailObj.text = text;
        }
        yield transporter.sendMail(mailObj);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
