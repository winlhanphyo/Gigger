'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.POST,
      [
        {
          caption: "Post1",
          music: JSON.stringify([1, 2]),
          address: "Singapore",
          advertisementFormat: 1,
          searchResult: "Artists",
          giglistClassifieds: "Musicians",
          targetAudience: "Auto",
          privateContent: true,
          memberShipContent: true,
          forMyFollowersOnly: true,
          video: "1.mp4",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          caption: "Post2",
          music: JSON.stringify([2]),
          address: "Singapore",
          advertisementFormat: 1,
          searchResult: "Home/All",
          giglistClassifieds: "Services",
          targetAudience: "Post Tags",
          privateContent: true,
          memberShipContent: true,
          forMyFollowersOnly: true,
          video: "2.mp4",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          caption: "Post3",
          music: JSON.stringify([3, 4]),
          address: "Singapore",
          advertisementFormat: 1,
          searchResult: "Events",
          giglistClassifieds: "Gear",
          targetAudience: "Interests",
          privateContent: true,
          memberShipContent: true,
          forMyFollowersOnly: true,
          video: "3.mp4",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.POST, {}, {});
  }
};
