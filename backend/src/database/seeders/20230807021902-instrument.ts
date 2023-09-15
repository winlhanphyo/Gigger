'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.INSTRUMENT,
      [
        {
          name: "Bass",
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          name: "Guitar",
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          name: "Drum",
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.INSTRUMENT, {}, {});
  }
};
