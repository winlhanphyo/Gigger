"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetDbModel = void 0;
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
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
};
let PasswordResetDbModel = class PasswordResetDbModel extends sequelize_1.Model {
    static associate({}) {
        //     this.belongsTo(CategoryDbModel, { foreignKey: 'categoryId', as: 'category', targetKey: 'id' });
        //     this.belongsTo(UserDbModel, { foreignKey: 'createdUserId', as: 'createdProductyByUser', targetKey: 'id' });
        //     this.belongsTo(UserDbModel, { foreignKey: 'updatedUserId', as: 'updatedProductByUser', targetKey: 'id' });
    }
};
PasswordResetDbModel = __decorate([
    associate_decorator_1.associative
], PasswordResetDbModel);
exports.PasswordResetDbModel = PasswordResetDbModel;
PasswordResetDbModel.init(modelAttributes, {
    sequelize: db_provider_1.db,
    modelName: constants_1.DataBaseModelNames.PASSWORD_RESET,
    tableName: constants_1.DataBaseTableNames.PASSWORD_RESET,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timestamps: true
});
