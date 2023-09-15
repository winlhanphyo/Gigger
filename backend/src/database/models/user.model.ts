import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';
export interface IUserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  role: number;
  dob: string;
  interest: JSON;
  profile: string;
  highlight: string;
  address: string;
  description: string;
  status: string;
  genre: JSON;
  instrument: JSON;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IUserModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_role',
      key: 'id'
    }
  },
  dob: {
    type: DataTypes.DATE,
  },
  interest: {
    type: DataTypes.JSON,
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  highlight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  genre: {
    type: DataTypes.JSON,
    allowNull: true
  },
  instrument: {
    type: DataTypes.JSON,
    allowNull: true
  },
};
@associative
export class UserDbModel extends Model {
  static associate({ EventDbModel, UserRoleDbModel, VideoDbModel, PostDbModel, UserLikeViewPostDbModel }: any) {
    this.belongsToMany(EventDbModel, { through: 'event_user' });
    this.belongsTo(UserRoleDbModel, { foreignKey: 'role', as: 'user_role', targetKey: 'id' });
    // this.hasMany(EventDbModel, { foreignKey: 'createdUser', as: 'user' });
    this.hasMany(PostDbModel, { foreignKey: 'createdUser', as: 'createdByUser' });
    this.hasMany(PostDbModel, { foreignKey: 'updatedUser', as: 'updatedByUser' });
    // this.hasMany(UserLikeViewPostDbModel, { foreignKey: 'userId', as: 'userLikeList' });
    this.belongsToMany(VideoDbModel, {through: 'user_video'});
  }
}

UserDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER,
  tableName: DataBaseTableNames.USER,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
