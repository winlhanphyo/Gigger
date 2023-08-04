'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.EVENT,
     [
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
 },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.EVENT, {}, {});
  }
};
