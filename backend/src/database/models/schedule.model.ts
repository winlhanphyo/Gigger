'use strict';
import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IScheduleModel {
  id: number;
  available: boolean;
  allowToCall: boolean;
  dailySchedule: JSON;
  autoBooking: boolean;
  tempUnavailable: boolean;
  doNotDisturb: boolean;
  custommessage: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IScheduleModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  allowToCall: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  dailySchedule: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  autoBooking: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tempUnavailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  doNotDisturb: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  custommessage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
};
@associative
export class ScheduleDbModel extends Model {
}

ScheduleDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.SCHEDULE,
  tableName: DataBaseTableNames.SCHEDULE,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
