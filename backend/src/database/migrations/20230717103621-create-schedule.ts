'use strict';

import { DataTypes, QueryInterface, QueryOptions } from "sequelize";
import { DataBaseTableNames } from "../constants";
import { migrationWrapper } from "../transactions";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    await queryInterface.createTable('schedule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      available: {
        type: DataTypes.BOOLEAN
      },
      allowToCall: {
        type: DataTypes.BOOLEAN
      },
      dailySchedule: {
        type: DataTypes.JSON
      },
      autoBooking: {
        type: DataTypes.BOOLEAN
      },
      tempUnavailable: {
        type: DataTypes.BOOLEAN
      },
      doNotDisturb: {
        type: DataTypes.BOOLEAN
      },
      customMsg: {
        type: DataTypes.STRING
      },
      userId: {
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
        DataBaseTableNames.SCHEDULE, options);
    };
    await migrationWrapper(migration);
  }
};
