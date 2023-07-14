'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.EVENT_USER,
      [
        {
          eventId: 1,
          userId: 1,
          status: 'going',
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        }
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.EVENT_USER, {}, {});
  }
};
