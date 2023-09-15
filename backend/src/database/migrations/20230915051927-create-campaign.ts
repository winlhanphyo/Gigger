'use strict';

import { DataTypes, QueryInterface, QueryOptions } from "sequelize";
import { DataBaseTableNames } from "../constants";
import { migrationWrapper } from "../transactions";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    await queryInterface.createTable(DataBaseTableNames.CAMPAIGN, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      endDate: {
        type: DataTypes.STRING
      },
      hashTags: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      memberShipContent: {
        type: DataTypes.BOOLEAN
      },
      followerOnly: {
        type: DataTypes.BOOLEAN
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
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    const migration = async (options: QueryOptions) => {
      await queryInterface.dropTable(
        DataBaseTableNames.CAMPAIGN, options);
    };
    await migrationWrapper(migration);
  }
};