'use strict';

import { QueryInterface } from "sequelize";

import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
     return queryInterface.bulkInsert(DataBaseTableNames.INTEREST,
      [
        {
          name: 'Recording Studios',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'NFT',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Bass',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Rock',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Metal',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.INTEREST, {}, {});
  }
};
