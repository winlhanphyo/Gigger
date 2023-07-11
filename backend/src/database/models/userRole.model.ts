import { DataTypes, Model, ModelAttributes } from "sequelize";

import { DataBaseTableNames, DataBaseModelNames } from "../constants";

import { DbModelFieldInit } from "../db-structure.model";

import { db } from '../db.provider';

import { associative } from './associate.decorator';

export interface IUserRoleModel {
  id: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const modelAttributes: DbModelFieldInit<Partial<IUserRoleModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

@associative
export class UserRoleDbModel extends Model {
  static associate({
    UserDbModel
  }: any) {
  this.hasMany(UserDbModel, { foreignKey: 'role', as: 'user_role' });
  }
}

UserRoleDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER_ROLE,
  tableName: DataBaseTableNames.USER_ROLE,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
