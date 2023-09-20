"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
let winston = require('winston');
require('winston-daily-rotate-file');
var giggerInfo = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'post-info-%DATE%.log',
    dirname: './src/dailylog/gigger-info-log',
    maxFiles: 2,
    json: true,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
var giggerError = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'post-error-%DATE%.log',
    dirname: './src/dailylog/gigger-error-log',
    maxFiles: 2,
    json: true,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
var giggerInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        giggerInfo
    ]
});
var giggerErrorLogger = winston.createLogger({
    transports: [
        giggerError
    ]
});
module.exports = { giggerInfoLogger, giggerErrorLogger };
