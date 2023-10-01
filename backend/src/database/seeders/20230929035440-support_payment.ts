'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.SUPPORT_PAYMENT,
    [
      {
        donatorId: 1,
        postId: 1,
        message: "I support this post.",
        amount: 1000,
        paymentDone: true,
        createdAt: '2023-08-07',
        updatedAt: '2023-08-07'
      },
      {
        donatorId: 2,
        postId: 1,
        message: "I support this post.",
        amount: 3000,
        paymentDone: true,
        createdAt: '2023-08-07',
        updatedAt: '2023-08-07'
      },
      {
        donatorId: 3,
        postId: 1,
        message: "I support this post.",
        amount: 5000,
        paymentDone: true,
        createdAt: '2023-08-07',
        updatedAt: '2023-08-07'
      },
    ], {});
},

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.SUPPORT_PAYMENT, {}, {});
  }
};
