'use strict';

import { DataTypes, ModelAttributes, QueryInterface, QueryOptions } from "sequelize";
import { DataBaseTableNames } from "../constants";
import { migrationWrapper } from "../transactions";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    await queryInterface.createTable('event_user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      eventId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.STRING(20)
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
        DataBaseTableNames.EVENT_USER, options);
    };
    await migrationWrapper(migration);
  }
};