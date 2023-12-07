import { DataTypes, Model, ModelAttributes } from "sequelize";
import { associative } from './associate.decorator';
import { DataBaseTableNames, DataBaseModelNames } from "../constants";
import { DbModelFieldInit } from "../db-structure.model";
import { db } from '../db.provider';

export interface IEventModel {
  id: number;
  eventName: string;
  fromDateTime: string;
  toDateTime: string;
  description: string;
  beforeReminder: string;
  reminderStatus: string;
  latitude: string;
  longitude: string;
  artists: JSON;
  participants: JSON;
  color: string;
  createdUser: number;
  updatedUser: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface EventInputModel {
  id: number;
  eventName: string;
  participants: [];
  fromDateTime: string;
  toDateTime: string;
  description: string;
  beforeReminder: string;
  reminderStatus: string;
  latitude: string;
  longitude: string;
  artists: [];
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
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  fromDateTime: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  toDateTime: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
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
  participants: {
    type: DataTypes.JSON,
    allowNull: true
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
  },
  createdUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  updatedUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
};
@associative
export class EventDbModel extends Model {
  static associate({ UserDbModel }: any) {
    this.belongsToMany(UserDbModel, { through: 'event_user' });
    // this.belongsTo(UserDbModel, { foreignKey: 'createdUser', as: 'user', targetKey: 'id' });
  }
}

EventDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.EVENT,
  tableName: DataBaseTableNames.EVENT,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  timestamps: true
});
