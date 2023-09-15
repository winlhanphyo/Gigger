import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface ICampaignModel {
  id: number;
  title: string;
  description: string;
  endDate: string;
  hashTags: string;
  location: string;
  memberShipContent: boolean;
  followerOnly: boolean;
  createdUser: string;
  updatedUser: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CampaignInputModel {
  id: number;
  title: string;
  description: string;
  endDate: string;
  hashTags: string;
  location: string;
  memberShipContent: boolean;
  followerOnly: boolean;
}

const modelAttributes: DbModelFieldInit<Partial<ICampaignModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hashTags: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  memberShipContent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  followerOnly: {
    type: DataTypes.BOOLEAN,
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
export class CampaignDbModel extends Model {
  static associate({ UserDbModel, UserLikeViewPostDbModel }: any) {
    // this.belongsToMany(UserDbModel, {through: 'event_user'});
    // this.hasMany(UserLikeViewPostDbModel, { foreignKey: 'postId', as: 'postLikeList' });
    this.belongsTo(UserDbModel, { foreignKey: 'createdUser', as: 'createdByUser', targetKey: 'id' });
    this.belongsTo(UserDbModel, { foreignKey: 'updatedUser', as: 'updatedByUser', targetKey: 'id' });
  }
}

CampaignDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.CAMPAIGN,
  tableName: DataBaseTableNames.CAMPAIGN,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
