import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IUserLikeViewPostModel {
  id: number;
  userId: number;
  postId: number;
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
  postId: {
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
export class UserLikeViewPostDbModel extends Model {
  static associate({
    UserDbModel,
    PostDbModel
  }: any) {
    this.belongsTo(PostDbModel, { foreignKey: 'postId', as: 'postLikeList' });
    this.belongsTo(UserDbModel, { foreignKey: 'userId', as: 'userLikeList' });
  }
}

UserLikeViewPostDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER_LIKE_VIEW_POST,
  tableName: DataBaseTableNames.USER_LIKE_VIEW_POST,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});

