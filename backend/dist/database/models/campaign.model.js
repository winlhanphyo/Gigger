"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignDbModel = void 0;
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
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    endDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hashTags: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    memberShipContent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    followerOnly: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
        references: {
            model: 'user',
            key: 'id'
        }
    },
};
let CampaignDbModel = class CampaignDbModel extends sequelize_1.Model {
    static associate({ UserDbModel, UserLikeViewPostDbModel }) {
        // this.belongsToMany(UserDbModel, {through: 'event_user'});
        // this.hasMany(UserLikeViewPostDbModel, { foreignKey: 'postId', as: 'postLikeList' });
        this.belongsTo(UserDbModel, { foreignKey: 'createdUser', as: 'createdByUser', targetKey: 'id' });
        this.belongsTo(UserDbModel, { foreignKey: 'updatedUser', as: 'updatedByUser', targetKey: 'id' });
    }
};
CampaignDbModel = __decorate([
    associate_decorator_1.associative
], CampaignDbModel);
exports.CampaignDbModel = CampaignDbModel;
CampaignDbModel.init(modelAttributes, {
    sequelize: db_provider_1.db,
    modelName: constants_1.DataBaseModelNames.CAMPAIGN,
    tableName: constants_1.DataBaseTableNames.CAMPAIGN,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timestamps: true
});
