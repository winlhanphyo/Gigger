"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDbModel = void 0;
const sequelize_1 = require("sequelize");
const associate_decorator_1 = require("./associate.decorator");
const constants_1 = require("../constants");
const db_provider_1 = require("../db.provider");
const modelAttributes = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    eventName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    fromTime: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    toTime: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    beforeReminder: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    reminderStatus: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    artists: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    color: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    latitude: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    longitude: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    createdUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    updatedUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
};
let EventDbModel = class EventDbModel extends sequelize_1.Model {
    static associate({ UserDbModel }) {
        this.belongsToMany(UserDbModel, { through: 'event_user' });
        // this.belongsTo(UserDbModel, { foreignKey: 'createdUser', as: 'user', targetKey: 'id' });
    }
};
EventDbModel = __decorate([
    associate_decorator_1.associative
], EventDbModel);
exports.EventDbModel = EventDbModel;
EventDbModel.init(modelAttributes, {
    sequelize: db_provider_1.db,
    modelName: constants_1.DataBaseModelNames.EVENT,
    tableName: constants_1.DataBaseTableNames.EVENT,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timestamps: true
});
