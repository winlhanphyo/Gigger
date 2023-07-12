import { DataTypes, Model, ModelAttributes } from "sequelize";
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';
import { associative } from './associate.decorator';

export interface IEventModel {
  id: number;
  eventName: string;
  address: string;
  date: string;
  fromTime: string;
  toTime: string;
  description: string;
  participants: JSON;
  beforeReminder: string;
  reminderStatus: string;
  latitude: string;
  longitude: string;
  artists: JSON;
  color: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const modelAttributes: DbModelFieldInit<Partial<IEventModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  fromTime: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  toTime: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  participants: {
    type: DataTypes.JSON
  },
  beforeReminder: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  reminderStatus: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  artists: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  color: {
    type: DataTypes.STRING(50)
  },
  latitude: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  longitude: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
};
@associative
export class EventDbModel extends Model {
}

EventDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.EVENT,
  tableName: DataBaseTableNames.EVENT,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});