'use strict';
import { DataTypes, ModelAttributes, QueryInterface, QueryOptions } from "sequelize";
import { DataBaseTableNames } from "../constants";
import { migrationWrapper } from "../transactions";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    await queryInterface.createTable('event', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      eventName: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fromTime: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      toTime: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      participants: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      beforeReminder: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      reminderStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      artists: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING(50),
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
        DataBaseTableNames.EVENT, options);
    };
    await migrationWrapper(migration);
  }
};