import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IGenreModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IGenreModel>> = {
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
export class GenreDbModel extends Model {
}

GenreDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.GENRE,
  tableName: DataBaseTableNames.GENRE,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});