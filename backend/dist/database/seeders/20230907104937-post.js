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
            return queryInterface.bulkInsert(constants_1.DataBaseTableNames.POST, [
                {
                    caption: "Post1",
                    music: JSON.stringify([1, 2]),
                    // address: "Singapore",
                    latitude: "1.3505696580073028",
                    longitude: "103.86638379305228",
                    advertisementFormat: 1,
                    searchResult: "Artists",
                    giglistClassifieds: "Musicians",
                    targetAudience: "Auto",
                    privateContent: true,
                    memberShipContent: true,
                    forMyFollowersOnly: true,
                    video: "1.mp4",
                    thumbnail: "api/user/profile/1.png",
                    createdUser: 1,
                    createdAt: '2023-08-07',
                    updatedAt: '2023-08-07'
                },
                {
                    caption: "Post2",
                    music: JSON.stringify([2]),
                    // address: "Singapore",
                    latitude: "1.3423268491121407",
                    longitude: "103.86747078019175",
                    advertisementFormat: 1,
                    searchResult: "Home/All",
                    giglistClassifieds: "Services",
                    targetAudience: "Post Tags",
                    privateContent: true,
                    memberShipContent: true,
                    forMyFollowersOnly: true,
                    video: "2.mp4",
                    thumbnail: "api/user/profile/2.png",
                    createdUser: 1,
                    createdAt: '2023-08-07',
                    updatedAt: '2023-08-07'
                },
                {
                    caption: "Post3",
                    music: JSON.stringify([3, 4]),
                    // address: "Singapore",
                    latitude: "1.3796342587179522",
                    longitude: "103.88796098243297",
                    advertisementFormat: 1,
                    searchResult: "Events",
                    giglistClassifieds: "Gear",
                    targetAudience: "Interests",
                    privateContent: true,
                    memberShipContent: true,
                    forMyFollowersOnly: true,
                    video: "3.mp4",
                    thumbnail: "api/user/profile/3.png",
                    createdUser: 1,
                    createdAt: '2023-08-07',
                    updatedAt: '2023-08-07'
                },
            ], {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants_1.DataBaseTableNames.POST, {}, {});
    }
};
