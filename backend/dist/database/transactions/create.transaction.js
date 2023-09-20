"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const db_provider_1 = require("../db.provider");
const createTransaction = () => db_provider_1.db.transaction();
exports.createTransaction = createTransaction;
