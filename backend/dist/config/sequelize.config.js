"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
module.exports = {
    local: {
        username: config_1.config.DB_USERNAME || 'root',
        password: config_1.config.DB_PASSWORD || 'root',
        database: config_1.config.DB_NAME || 'nodejs',
        host: config_1.config.DB_HOST || '127.0.0.1',
        port: config_1.config.DB_PORT || '3306',
        dialect: 'mysql'
    },
    development: {
        username: config_1.config.DB_USERNAME || 'root',
        password: config_1.config.DB_PASSWORD || 'root',
        database: config_1.config.DB_NAME || 'nodejs',
        host: config_1.config.DB_HOST || '127.0.0.1',
        port: config_1.config.DB_PORT || '3306',
        dialect: 'mysql'
    },
    production: {
        username: config_1.config.DB_USERNAME || 'root',
        password: config_1.config.DB_PASSWORD || 'root',
        database: config_1.config.DB_NAME || 'nodejs',
        host: config_1.config.DB_HOST || '127.0.0.1',
        port: config_1.config.DB_PORT || '3306',
        dialect: 'mysql'
    },
    test: {
        username: config_1.config.DB_USERNAME || 'root',
        password: config_1.config.DB_PASSWORD || 'root',
        database: config_1.config.DB_NAME || 'nodejs',
        host: config_1.config.DB_HOST || '127.0.0.1',
        port: config_1.config.DB_PORT || '3306',
        dialect: 'mysql'
    },
};
