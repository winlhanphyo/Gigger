import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IArtistVideoModel {
  id: number;
  artistId: number;
  videoId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IArtistVideoModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'artist',
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
export class ArtistVideoDbModel extends Model {
  static associate({
    ArtistDbModel,
    VideoDbModel
  }: any) {
    this.belongsTo(VideoDbModel, { foreignKey: 'videoId', as: 'videos' });
    this.belongsTo(ArtistDbModel, { foreignKey: 'artistId', as: 'artist' });
  }
}

ArtistVideoDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.ARTIST_VIDEO,
  tableName: DataBaseTableNames.ARTIST_VIDEO,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});

