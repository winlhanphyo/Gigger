import { DataTypes, Model, ModelAttributes } from "sequelize";

import { DataBaseTableNames, DataBaseModelNames } from "../constants";

import { DbModelFieldInit } from "../db-structure.model";

import { db } from '../db.provider';

import { associative } from './associate.decorator';

export interface IUserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  role: number;
  dob: string;
  interest: JSON;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IUserModel>> = {
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
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_role',
      key: 'id'
    }
  },
  dob: {
    type: DataTypes.DATE,
  },
  interest: {
    type: DataTypes.JSON,
  }
};
@associative
export class UserDbModel extends Model {
}

UserDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER,
  tableName: DataBaseTableNames.USER,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});