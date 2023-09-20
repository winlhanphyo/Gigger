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
const constants_1 = require("../constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.bulkInsert(constants_1.DataBaseTableNames.EVENT, [
                {
                    eventName: 'Weeding Dinner Party',
                    address: 'Singapore',
                    date: '2023-07-12',
                    fromTime: '9:00 AM',
                    toTime: '5:00 PM',
                    description: 'John Dinner Party',
                    //  participants: [1, 2],
                    beforeReminder: false,
                    reminderStatus: 'busy',
                    latitude: '1.3530442682774015',
                    longitude: '103.8489492129429',
                    createdUser: 1,
                    createdAt: '2023-07-12',
                    updatedAt: '2023-07-12'
                }
            ], {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants_1.DataBaseTableNames.EVENT, {}, {});
    }
};
