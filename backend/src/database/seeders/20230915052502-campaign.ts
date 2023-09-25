'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.CAMPAIGN,
      [
        {
          title: "Campaign1",
          description: "My First Campaign",
          endDate: "2023-10-01",
          hashTags: 1,
          location: "Artists",
          memberShipContent: true,
          followerOnly: true,
          image: "upload/user/campaign/1.jpg",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          title: "Campaign2",
          description: "My Second Campaign",
          endDate: "2023-10-01",
          hashTags: 1,
          location: "Artists",
          memberShipContent: true,
          followerOnly: true,
          image: "upload/user/campaign/2.jpg",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          title: "Campaign3",
          description: "My Third Campaign",
          endDate: "2023-10-01",
          hashTags: 1,
          location: "Artists",
          memberShipContent: true,
          followerOnly: true,
          image: "upload/campaign/3.jpg",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.CAMPAIGN, {}, {});
  }
};
