'use strict';

import { QueryInterface } from "sequelize";

import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
     return queryInterface.bulkInsert(DataBaseTableNames.USER_ROLE,
      [
        {
          name: 'Free Account',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Pro Account',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
      ], {});

  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.USER_ROLE, {}, {});
  }
};
