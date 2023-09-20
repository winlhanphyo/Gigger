'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.bulkInsert(constants_1.DataBaseTableNames.USER_LIKE_VIEW_PROFILE, [
                {
                    userId: 1,
                    artistId: 1,
                    status: "like",
                    createdAt: '2023-07-12',
                    updatedAt: '2023-07-12'
                },
                {
                    userId: 1,
                    artistId: 1,
                    status: "view",
                    createdAt: '2023-07-12',
                    updatedAt: '2023-07-12'
                },
                {
                    userId: 2,
                    artistId: 1,
                    status: "view",
                    createdAt: '2023-07-12',
                    updatedAt: '2023-07-12'
                },
            ], {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants_1.DataBaseTableNames.USER_LIKE_VIEW_PROFILE, {}, {});
    }
};
