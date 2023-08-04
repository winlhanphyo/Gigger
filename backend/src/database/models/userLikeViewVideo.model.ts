import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IUserLikeViewVideoModel {
  id: number;
  userId: number;
  videoId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IUserLikeViewVideoModel>> = {
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
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

@associative
export class UserLikeViewVideoDbModel extends Model {
  static associate({
    UserDbModel,
    VideoDbModel
  }: any) {
    this.belongsTo(VideoDbModel, { foreignKey: 'videoId', as: 'videoLikeList' });
    this.belongsTo(UserDbModel, { foreignKey: 'userId', as: 'userLikeList' });
  }
}

UserLikeViewVideoDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER_LIKE_VIEW_VIDEO,
  tableName: DataBaseTableNames.USER_LIKE_VIEW_VIDEO,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});

