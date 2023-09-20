"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class DbProvider {
    constructor() {
        this.db = new sequelize_1.Sequelize(config_1.config.DB_NAME, config_1.config.DB_USERNAME, config_1.config.DB_PASSWORD, {
            host: config_1.config.DB_HOST,
            port: +config_1.config.DB_PORT,
            dialect: 'mysql',
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci'
            },
            dialectOptions: { decimalNumbers: true }
        });
    }
}
exports.db = new DbProvider().db;
