'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.USER_LIKE_VIEW_POST,
      [
        {
          userId: 1,
          postId: 1,
          status: "like",
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
        {
          userId: 1,
          postId: 1,
          status: "view",
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
        {
          userId: 2,
          postId: 1,
          status: "view",
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.USER_LIKE_VIEW_POST, {}, {});
  }
};
