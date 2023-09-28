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
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, dataTypes) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('post', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            caption: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            music: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            latitude: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            longitude: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            advertisementFormat: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            searchResult: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            giglistClassifieds: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            targetAudience: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            privateContent: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            },
            memberShipContent: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            },
            forMyFollowersOnly: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            },
            thumbnail: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            video: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            createdUser: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            updatedUser: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE
            }
        });
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const migration = (options) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.dropTable(constants_1.DataBaseTableNames.POST, options);
        });
        yield (0, transactions_1.migrationWrapper)(migration);
    })
};
