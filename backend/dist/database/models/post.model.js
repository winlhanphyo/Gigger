"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDbModel = void 0;
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
        allowNull: true,
    },
    artist: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    caption: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    music: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    advertisementFormat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    searchResult: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    giglistClassifieds: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    targetAudience: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    privateContent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    memberShipContent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    forMyFollowersOnly: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    video: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    thumbnail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hashTag: {
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
let PostDbModel = class PostDbModel extends sequelize_1.Model {
    static associate({ UserDbModel, SupportPaymentDbModel }) {
        // this.belongsToMany(UserDbModel, {through: 'event_user'});
        // this.hasMany(UserLikeViewPostDbModel, { foreignKey: 'postId', as: 'postLikeList' });
        this.belongsTo(UserDbModel, { foreignKey: 'createdUser', as: 'createdByUser', targetKey: 'id' });
        this.belongsTo(UserDbModel, { foreignKey: 'updatedUser', as: 'updatedByUser', targetKey: 'id' });
        // this.hasMany(SupportPaymentDbModel, { foreignKey: 'postId', as: 'supportPost' });
    }
};
PostDbModel = __decorate([
    associate_decorator_1.associative
], PostDbModel);
exports.PostDbModel = PostDbModel;
PostDbModel.init(modelAttributes, {
    sequelize: db_provider_1.db,
    modelName: constants_1.DataBaseModelNames.POST,
    tableName: constants_1.DataBaseTableNames.POST,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timestamps: true
});
