'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.SCHEDULE,
      [
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
          custommessage: "Please do not distrub",
          userId: 1,
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        }
      ], {});
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.SCHEDULE, {}, {});
  }
};
