'use strict';

import { DataTypes, QueryInterface, QueryOptions } from "sequelize";
import { DataBaseTableNames } from "../constants";
import { migrationWrapper } from "../transactions";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    await queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      music: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      advertisementFormat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      searchResult: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      giglistClassifieds: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      targetAudience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      privateContent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      memberShipContent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      forMyFollowersOnly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      video: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdUser: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      updatedUser: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    const migration = async (options: QueryOptions) => {
      await queryInterface.dropTable(
        DataBaseTableNames.POST, options);
    };
    await migrationWrapper(migration);
  }
};