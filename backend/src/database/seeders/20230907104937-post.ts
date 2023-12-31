'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.POST,
      [
        {
          title: "Post1 Title",
          caption: "Post1",
          artist: JSON.stringify([1, 2]),
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
          thumbnail: "upload/user/thumbnail/1.png",
          hashTag: "#newVideo #newsong #passion #jazz #followme #NFT",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          title: "Post2 Title",
          caption: "Post2",
          artist: JSON.stringify([1, 2]),
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
          thumbnail: "upload/user/thumbnail/2.png",
          hashTag: "#newVideo #newsong #passion #jazz #followme #NFT",
          createdUser: 1,
          createdAt: '2023-08-07',
          updatedAt: '2023-08-07'
        },
        {
          title: "Post3 Title",
          caption: "Post3",
          artist: JSON.stringify([1, 2]),
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
          thumbnail: "upload/user/thumbnail/3.png",
          hashTag: "#thenewmusicera #dickgamberville",
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
