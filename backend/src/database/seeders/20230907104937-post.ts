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
          // address: "Singapore",
          latitude: "1.3505696580073028",
          longitude: "103.86638379305228",
          advertisementFormat: 1,
          searchResult: "Artists",
          giglistClassifieds: "Musicians",
          targetAudience: "Auto",
          privateContent: true,
          memberShipContent: true,
          forMyFollowersOnly: true,
          video: "1.mp4",
          thumbnail: "api/user/profile/1.png",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          caption: "Post2",
          music: JSON.stringify([2]),
          // address: "Singapore",
          latitude: "1.3423268491121407",
          longitude: "103.86747078019175",
          advertisementFormat: 1,
          searchResult: "Home/All",
          giglistClassifieds: "Services",
          targetAudience: "Post Tags",
          privateContent: true,
          memberShipContent: true,
          forMyFollowersOnly: true,
          video: "2.mp4",
          thumbnail: "api/user/profile/2.png",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          caption: "Post3",
          music: JSON.stringify([3, 4]),
          // address: "Singapore",
          latitude: "1.3796342587179522",
          longitude: "103.88796098243297",
          advertisementFormat: 1,
          searchResult: "Events",
          giglistClassifieds: "Gear",
          targetAudience: "Interests",
          privateContent: true,
          memberShipContent: true,
          forMyFollowersOnly: true,
          video: "3.mp4",
          thumbnail: "api/user/profile/3.png",
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
