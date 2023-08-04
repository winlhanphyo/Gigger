import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IUserVideoModel {
  id: number;
  userId: number;
  videoId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IUserVideoModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  videoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'video',
      key: 'id'
    }
  }
};

@associative
export class UserVideoDbModel extends Model {
  static associate({
    ArtistDbModel,
    VideoDbModel
  }: any) {
    this.belongsTo(VideoDbModel, { foreignKey: 'videoId', as: 'video' });
    this.belongsTo(ArtistDbModel, { foreignKey: 'userId', as: 'user' });
  }
}

UserVideoDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER_VIDEO,
  tableName: DataBaseTableNames.USER_VIDEO,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});

