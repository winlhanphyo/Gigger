'use strict';

import { QueryInterface } from "sequelize";
import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert(DataBaseTableNames.ARTIST,
      [
        {
          artistName: "Mario Mix",
          profile: "assets/img/1.jpg",
          highlight: "Professional Sound Engeering",
          address: "Arena di Verona",
          description: "One Man Show",
          status: "available",
          // liveURL: "",
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
        {
          artistName: "Planet Riff",
          profile: "assets/img/2.jpg",
          highlight: "Guitar@Band",
          address: "Rock Rooms Inc",
          description: "",
          status: "available",
          // liveURL: "",
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
        {
          artistName: "Band",
          profile: "assets/img/3.jpg",
          highlight: "Music Band",
          address: "Wembley Stadium",
          description: "Rehearsal with Alessio",
          status: "available",
          // liveURL: "",
          createdAt: '2023-07-12',
          updatedAt: '2023-07-12'
        },
      ], {});
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.EVENT_USER, {}, {});
  }
};
