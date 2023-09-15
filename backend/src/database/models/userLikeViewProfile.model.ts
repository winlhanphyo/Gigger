import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IUserLikeViewPostModel {
  id: number;
  userId: number;
  artistId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IUserLikeViewPostModel>> = {
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
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'post',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

@associative
export class UserLikeViewProfileDbModel extends Model {
  static associate({
    UserDbModel
  }: any) {
    this.belongsTo(UserDbModel, { foreignKey: 'artistId', as: 'userProfile' });
    this.belongsTo(UserDbModel, { foreignKey: 'userId', as: 'userLikeData' });
  }
}

UserLikeViewProfileDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER_LIKE_VIEW_PROFILE,
  tableName: DataBaseTableNames.USER_LIKE_VIEW_PROFILE,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});

