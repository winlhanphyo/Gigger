"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDbModel = void 0;
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
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user_role',
            key: 'id'
        }
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
    },
    interest: {
        type: sequelize_1.DataTypes.JSON,
    },
    profile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    highlight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    genre: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    instrument: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    services: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    experiences: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    studies: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    achievements: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    coverPhoto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    quote1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "Let Me Stay Among the Star"
    },
    quote2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "I wanna Rock on the Stairways to Heaven!!"
    },
    customTitle: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: "[{'songTitle': 'Shape of you'}]"
    },
    instagram: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    youtube: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    facebook: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    twitter: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    tittok: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    verifyAccount: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
};
let UserDbModel = class UserDbModel extends sequelize_1.Model {
    static associate({ EventDbModel, UserRoleDbModel, PostDbModel }) {
        this.belongsToMany(EventDbModel, { through: 'event_user' });
        this.belongsTo(UserRoleDbModel, { foreignKey: 'role', as: 'user_role', targetKey: 'id' });
        // this.hasMany(EventDbModel, { foreignKey: 'createdUser', as: 'user' });
        this.hasMany(PostDbModel, { foreignKey: 'createdUser', as: 'createdByUser' });
        this.hasMany(PostDbModel, { foreignKey: 'updatedUser', as: 'updatedByUser' });
    }
};
UserDbModel = __decorate([
    associate_decorator_1.associative
], UserDbModel);
exports.UserDbModel = UserDbModel;
UserDbModel.init(modelAttributes, {
    sequelize: db_provider_1.db,
    modelName: constants_1.DataBaseModelNames.USER,
    tableName: constants_1.DataBaseTableNames.USER,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timestamps: true
});
