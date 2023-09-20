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
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationWrapper = void 0;
const create_transaction_1 = require("./create.transaction");
const migrationWrapper = (method) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield (0, create_transaction_1.createTransaction)();
    const options = { raw: true, transaction };
    try {
        yield method(options);
        yield transaction.commit();
    }
    catch (err) {
        yield transaction.rollback();
        throw err;
    }
});
exports.migrationWrapper = migrationWrapper;
