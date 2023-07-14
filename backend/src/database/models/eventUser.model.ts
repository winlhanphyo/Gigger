import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IEventUserModel {
  id: number;
  eventId: number;
  userId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const modelAttributes: DbModelFieldInit<Partial<IEventUserModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'event',
        key: 'id'
      }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'user',
        key: 'id'
      }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
};

@associative
export class EventUserDbModel extends Model {
  static associate({
    UserDbModel,
    EventDbModel
  }: any) {
    this.belongsTo(EventDbModel, { foreignKey: 'eventId', as: 'event' })
    this.belongsTo(UserDbModel, { foreignKey: 'userId', as: 'user' })
  }
}

EventUserDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.EVENT_USER,
  tableName: DataBaseTableNames.EVENT_USER,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
