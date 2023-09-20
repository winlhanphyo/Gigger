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
            return queryInterface.bulkInsert(constants_1.DataBaseTableNames.GENRE, [
                {
                    name: 'Recording Studios',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'NFT',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Bass',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Rock',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Metal',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Music Services',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Performances',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Memberships',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Violin',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Drums',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Piano',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Keyboards',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Blockchain',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Guitar',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Jazz',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'DJ',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Percussions',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Song Writing',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'ClassicalMusic',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Record Labels',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Lo-Fi',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Blues',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'RnB',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Raggae',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Live Events',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Classifieds',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Dance',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Soul',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Authorship',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Electronic Music',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Rap & Hip hop',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Crowdfunding',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
                {
                    name: 'Club',
                    createdAt: '2023-07-11',
                    updatedAt: '2023-07-11'
                },
            ], {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants_1.DataBaseTableNames.GENRE, {}, {});
    }
};
