import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IVideoModel {
  id: number;
  name: string;
  description: string;
  url: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IVideoModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  viewCount: {
    type: DataTypes.NUMBER,
  },
  likeCount: {
    type: DataTypes.NUMBER,
  }
};
@associative
export class VideoDbModel extends Model {
  static associate({ ArtistDbModel }: any) {
    this.belongsToMany(ArtistDbModel, {through: 'artist_video'});
  }
}

VideoDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.VIDEO,
  tableName: DataBaseTableNames.VIDEO,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
