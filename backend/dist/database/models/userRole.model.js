"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleDbModel = void 0;
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
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
};
let UserRoleDbModel = class UserRoleDbModel extends sequelize_1.Model {
    static associate({ UserDbModel }) {
        this.hasMany(UserDbModel, { foreignKey: 'role', as: 'user_role' });
        // this.hasMany(UserDbModel, { foreignKey: 'role', as: 'user' });
        // this.belongsTo(UserDbModel, { foreignKey: 'role', as: 'user_role', targetKey: 'id' });
    }
};
UserRoleDbModel = __decorate([
    associate_decorator_1.associative
], UserRoleDbModel);
exports.UserRoleDbModel = UserRoleDbModel;
UserRoleDbModel.init(modelAttributes, {
    sequelize: db_provider_1.db,
    modelName: constants_1.DataBaseModelNames.USER_ROLE,
    tableName: constants_1.DataBaseTableNames.USER_ROLE,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timestamps: true
});
