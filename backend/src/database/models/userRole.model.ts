import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IUserRoleModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const modelAttributes: DbModelFieldInit<Partial<IUserRoleModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

@associative
export class UserRoleDbModel extends Model {
  static associate({
    UserDbModel
  }: any) {
    this.hasMany(UserDbModel, { foreignKey: 'role', as: 'user_role' });
    // this.hasMany(UserDbModel, { foreignKey: 'role', as: 'user' });
    // this.belongsTo(UserDbModel, { foreignKey: 'role', as: 'user_role', targetKey: 'id' });
  }
}

UserRoleDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.USER_ROLE,
  tableName: DataBaseTableNames.USER_ROLE,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
