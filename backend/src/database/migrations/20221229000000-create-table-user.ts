'use strict';

import { DataTypes, ModelAttributes, QueryInterface, QueryOptions } from "sequelize";
import { DataBaseTableNames } from "../constants";
import { migrationWrapper } from "../transactions";

export default {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    const migration = async (options: QueryOptions) => {
      await queryInterface.createTable(
        DataBaseTableNames.USER,
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          dob: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          interest: {
            type: DataTypes.JSON,
            allowNull: true,
          },
          profile: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          highlight: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          address: {
            type: DataTypes.STRING,
            allowNull: true
          },
          description: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          status: {
            type: DataTypes.STRING(50),
            allowNull: true,
          },
          genre: {
            type: DataTypes.JSON,
            allowNull: true
          },
          instrument: {
            type: DataTypes.JSON,
            allowNull: true
          },
          phone: {
            type: DataTypes.STRING(50),
            allowNull: true
          },
          services: {
            type: DataTypes.STRING,
            allowNull: true
          },
          experiences: {
            type: DataTypes.STRING,
            allowNull: true
          },
          studies: {
            type: DataTypes.STRING,
            allowNull: true
          },
          achievements: {
            type: DataTypes.STRING,
            allowNull: true
          },
          coverPhoto: {
            type: DataTypes.STRING,
            allowNull: true
          },
          quote1: {
            type: DataTypes.STRING,
            allowNull: true
          },
          quote2: {
            type: DataTypes.STRING,
            allowNull: true
          },
          customTitle: {
            type: DataTypes.JSON,
            allowNull: true
          },
          instagram: {
            type: DataTypes.STRING,
            allowNull: true
          },
          youtube: {
            type: DataTypes.STRING,
            allowNull: true
          },
          facebook: {
            type: DataTypes.STRING,
            allowNull: true
          },
          twitter: {
            type: DataTypes.STRING,
            allowNull: true
          },
          tittok: {
            type: DataTypes.STRING,
            allowNull: true
          },
          website: {
            type: DataTypes.STRING,
            allowNull: true
          },
          verifyAccount: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          },
          createdAt: {
            type: DataTypes.DATE
          },
          updatedAt: {
            type: DataTypes.DATE
          },
        } as ModelAttributes, options
      );
    };
    await migrationWrapper(migration);
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    const migration = async (options: QueryOptions) => {
      await queryInterface.dropTable(
        DataBaseTableNames.USER, options);
    };
    await migrationWrapper(migration);
  }
};