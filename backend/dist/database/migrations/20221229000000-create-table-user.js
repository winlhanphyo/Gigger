'use strict';
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
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants");
const transactions_1 = require("../transactions");
exports.default = {
    up: (queryInterface, dataTypes) => __awaiter(void 0, void 0, void 0, function* () {
        const migration = (options) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.createTable(constants_1.DataBaseTableNames.USER, {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                username: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                role: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                },
                dob: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false,
                },
                interest: {
                    type: sequelize_1.DataTypes.JSON,
                    allowNull: true,
                },
                profile: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                highlight: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                address: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                description: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                status: {
                    type: sequelize_1.DataTypes.STRING(50),
                    allowNull: true,
                },
                genre: {
                    type: sequelize_1.DataTypes.JSON,
                    allowNull: true
                },
                instrument: {
                    type: sequelize_1.DataTypes.JSON,
                    allowNull: true
                },
                phone: {
                    type: sequelize_1.DataTypes.STRING(50),
                    allowNull: true
                },
                services: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                experiences: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                studies: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                achievements: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                customTitle: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                instagram: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                youtube: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                facebook: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                twitter: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                tittok: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                website: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true
                },
                verifyAccount: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                    defaultValue: false
                },
                createdAt: {
                    type: sequelize_1.DataTypes.DATE
                },
                updatedAt: {
                    type: sequelize_1.DataTypes.DATE
                },
            }, options);
        });
        yield (0, transactions_1.migrationWrapper)(migration);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const migration = (options) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.dropTable(constants_1.DataBaseTableNames.USER, options);
        });
        yield (0, transactions_1.migrationWrapper)(migration);
    })
};
