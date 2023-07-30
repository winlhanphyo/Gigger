'use strict';

import { DataTypes, QueryInterface, QueryOptions } from "sequelize";
import { DataBaseTableNames } from "../constants";
import { migrationWrapper } from "../transactions";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    await queryInterface.createTable('artist_video', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      artistId: {
        type: DataTypes.INTEGER
      },
      videoId: {
        type: DataTypes.INTEGER
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
        DataBaseTableNames.ARTIST_VIDEO, options);
    };
    await migrationWrapper(migration);
  }
};