'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.VIDEO,
      [
        {
          name: "MY FIRST SOLO ALBUM",
          description: "Lorem ispum dolor",
          url: "/upload/video/1.mp4",
          viewCount: 100,
          likeCount: 100,
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
        {
          name: "Dancer in my video",
          description: "Lorem ispum dolor",
          url: "/upload/video/2.mp4",
          viewCount: 100,
          likeCount: 100,
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        }
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.VIDEO, {}, {});
  }
};
