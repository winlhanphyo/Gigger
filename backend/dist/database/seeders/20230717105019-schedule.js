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
            return queryInterface.bulkInsert(constants_1.DataBaseTableNames.SCHEDULE, [
                {
                    available: 1,
                    allowToCall: 1,
                    // dailySchedule: [
                    //   {
                    //     day: "Mon",
                    //     time: JSON.stringify([
                    //       {
                    //         fromTime: "16:00",
                    //         toTime: "18:00"
                    //       },
                    //       {
                    //         fromTime: "18:30",
                    //         toTime: "20:00"
                    //       },
                    //       {
                    //         fromTime: "21:00",
                    //         toTime: "00:00"
                    //       },
                    //       {
                    //         day: "Wed",
                    //         time: [
                    //           {
                    //             fromTime: "21:00",
                    //             toTime: "00:00"
                    //           }
                    //         ]
                    //       },
                    //       {
                    //         day: "Sat",
                    //         time: [
                    //           {
                    //             fromTime: "9:00",
                    //             toTime: "13:00"
                    //           }
                    //         ]
                    //       }
                    //     ])
                    //   }
                    // ],
                    autoBooking: 1,
                    tempUnavailable: 0,
                    doNotDisturb: 0,
                    customMsg: "Please do not distrub",
                    userId: 1,
                    createdAt: '2023-07-12',
                    updatedAt: '2023-07-12'
                }
            ], {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants_1.DataBaseTableNames.SCHEDULE, {}, {});
    }
};
