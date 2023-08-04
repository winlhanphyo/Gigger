'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.USER_VIDEO,
      [
        {
          userId: 1,
          videoId: 1,
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
        {
          userId: 1,
          videoId: 2,
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        }
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.USER_VIDEO, {}, {});
  }
};
