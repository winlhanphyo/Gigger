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
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
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