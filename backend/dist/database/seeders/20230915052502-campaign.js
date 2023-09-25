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
            return queryInterface.bulkInsert(constants_1.DataBaseTableNames.CAMPAIGN, [
                {
                    title: "Campaign1",
                    description: "My First Campaign",
                    endDate: "2023-10-01",
                    hashTags: 1,
                    location: "Artists",
                    memberShipContent: true,
                    followerOnly: true,
                    image: "upload/user/campaign/1.jpg",
                    createdUser: 1,
                    createdAt: '2023-08-07',
                    updatedAt: '2023-08-07'
                },
                {
                    title: "Campaign2",
                    description: "My Second Campaign",
                    endDate: "2023-10-01",
                    hashTags: 1,
                    location: "Artists",
                    memberShipContent: true,
                    followerOnly: true,
                    image: "upload/user/campaign/2.jpg",
                    createdUser: 1,
                    createdAt: '2023-08-07',
                    updatedAt: '2023-08-07'
                },
                {
                    title: "Campaign3",
                    description: "My Third Campaign",
                    endDate: "2023-10-01",
                    hashTags: 1,
                    location: "Artists",
                    memberShipContent: true,
                    followerOnly: true,
                    image: "upload/campaign/3.jpg",
                    createdUser: 1,
                    createdAt: '2023-08-07',
                    updatedAt: '2023-08-07'
                },
            ], {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants_1.DataBaseTableNames.CAMPAIGN, {}, {});
    }
};
