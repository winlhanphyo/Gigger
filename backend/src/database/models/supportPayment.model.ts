import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface ISupportPaymentModel {
  id: number;
  donatorId: number;
  postId: number;
  message: string;
  amount: number;
  paymentDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const modelAttributes: DbModelFieldInit<Partial<ISupportPaymentModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  donatorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'post',
      key: 'id'
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  paymentDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
};

@associative
export class SupportPaymentDbModel extends Model {
  static associate({
    UserDbModel
  }: any) {
    this.belongsTo(UserDbModel, { foreignKey: 'postId', as: 'supportPost', targetKey: 'id' });
    // this.hasMany(UserDbModel, { foreignKey: 'role', as: 'user' });
    // this.belongsTo(UserDbModel, { foreignKey: 'role', as: 'user_role', targetKey: 'id' });
  }
}

SupportPaymentDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.SUPPORT_PAYMENT,
  tableName: DataBaseTableNames.SUPPORT_PAYMENT,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
