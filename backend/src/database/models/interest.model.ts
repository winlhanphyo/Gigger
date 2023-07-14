import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IInterestModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IInterestModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};
@associative
export class InterestDbModel extends Model {
}

InterestDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.INTEREST,
  tableName: DataBaseTableNames.INTEREST,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});