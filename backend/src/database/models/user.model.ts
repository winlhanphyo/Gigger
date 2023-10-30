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
  phone: string;
  services: string;
  experiences: string;
  studies: string;
  achievements: string;
  coverPhoto: string;
  quote1: string;
  quote2: string;
  customTitle: string;
  instagram: string;
  youtube: string;
  facebook: string;
  twitter: string;
  tittok: string;
  website: string;
  verifyAccount: boolean;
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
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  services: {
    type: DataTypes.STRING,
    allowNull: true
  },
  experiences: {
    type: DataTypes.STRING,
    allowNull: true
  },
  studies: {
    type: DataTypes.STRING,
    allowNull: true
  },
  achievements: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quote1: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Let Me Stay Among the Star"
  },
  quote2: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "I wanna Rock on the Stairways to Heaven!!"
  },
  customTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true
  },
  youtube: {
    type: DataTypes.STRING,
    allowNull: true
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tittok: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  verifyAccount: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
};
@associative
export class UserDbModel extends Model {
  static associate({ EventDbModel, UserRoleDbModel, PostDbModel }: any) {
    this.belongsToMany(EventDbModel, { through: 'event_user' });
    this.belongsTo(UserRoleDbModel, { foreignKey: 'role', as: 'user_role', targetKey: 'id' });
    // this.hasMany(EventDbModel, { foreignKey: 'createdUser', as: 'user' });
    this.hasMany(PostDbModel, { foreignKey: 'createdUser', as: 'createdByUser' });
    this.hasMany(PostDbModel, { foreignKey: 'updatedUser', as: 'updatedByUser' });
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
