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
        yield queryInterface.createTable('schedule', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            available: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            allowToCall: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            dailySchedule: {
                type: sequelize_1.DataTypes.JSON
            },
            autoBooking: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            tempUnavailable: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            doNotDisturb: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            customMsg: {
                type: sequelize_1.DataTypes.STRING
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER
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
            yield queryInterface.dropTable(constants_1.DataBaseTableNames.SCHEDULE, options);
        });
        yield (0, transactions_1.migrationWrapper)(migration);
    })
};
