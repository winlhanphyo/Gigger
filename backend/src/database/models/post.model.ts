import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IPostModel {
  id: number;
  caption: string;
  music: JSON;
  latitude: string;
  longitude: string;
  advertisementFormat: string;
  searchResult: string;
  giglistClassifieds: string;
  targetAudience: string;
  privateContent: boolean;
  memberShipContent: boolean;
  forMyFollowersOnly: boolean;
  video: string;
  thumbnail: string;
  createdUser: string;
  updatedUser: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface PostInputModel {
  id: number;
  caption: string;
  music: string;
  address: string;
  advertisementFormat: string;
  searchResult: string;
  giglistClassifieds: string;
  targetAudience: string;
  privateContent: boolean;
  memberShipContent: boolean;
  forMyFollowersOnly: boolean;
  video: string;
}

const modelAttributes: DbModelFieldInit<Partial<IPostModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  music: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  advertisementFormat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  searchResult: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  giglistClassifieds: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetAudience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privateContent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  memberShipContent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  forMyFollowersOnly: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  updatedUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'user',
      key: 'id'
    }
  },
};
@associative
export class PostDbModel extends Model {
  static associate({ UserDbModel, UserLikeViewPostDbModel }: any) {
    // this.belongsToMany(UserDbModel, {through: 'event_user'});
    // this.hasMany(UserLikeViewPostDbModel, { foreignKey: 'postId', as: 'postLikeList' });
    this.belongsTo(UserDbModel, { foreignKey: 'createdUser', as: 'createdByUser', targetKey: 'id' });
    this.belongsTo(UserDbModel, { foreignKey: 'updatedUser', as: 'updatedByUser', targetKey: 'id' });
  }
}

PostDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.POST,
  tableName: DataBaseTableNames.POST,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
