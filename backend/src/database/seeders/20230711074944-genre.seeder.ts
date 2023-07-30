'use strict';

import { QueryInterface } from "sequelize";

import { DataBaseTableNames } from "../constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
     return queryInterface.bulkInsert(DataBaseTableNames.GENRE,
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
        {
          name: 'Music Services',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Performances',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Memberships',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Violin',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Drums',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Piano',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Keyboards',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Blockchain',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Guitar',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Jazz',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'DJ',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Percussions',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Song Writing',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'ClassicalMusic',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Record Labels',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Lo-Fi',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Blues',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'RnB',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Raggae',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Live Events',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Classifieds',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Dance',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Soul',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Authorship',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Electronic Music',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Rap & Hip hop',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Crowdfunding',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          name: 'Club',
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
      ], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.GENRE, {}, {});
  }
};
