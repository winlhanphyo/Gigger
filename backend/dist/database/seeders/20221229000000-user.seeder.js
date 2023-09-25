"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../constants");
exports.default = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkInsert(constants_1.DataBaseTableNames.USER, [
            {
                username: 'jamessmith',
                email: 'jamessmith@gmail.com',
                password: yield bcrypt_1.default.hash("12345678", 12),
                role: 1,
                dob: '1993-01-12',
                interest: JSON.stringify([1, 2]),
                profile: "upload/user/profile/1.jpg",
                highlight: "Professional Sound Engeering",
                address: "Arena di Verona",
                description: "Hey there I’m Ingviel! Loren ipsum dolor sit amen, conshctetuer adlpiscing elit, sed dial nonummy nigh euismod incident ut laoreet dolore magna aliquot erat volutpat. Ut wis!",
                status: "available",
                genre: JSON.stringify([1, 2]),
                instrument: JSON.stringify([1, 2]),
                phone: "+3912312",
                services: "Distribution on every channel, Promotion on radio and Socail Media, Recording Mixing and Mastering",
                experiences: "Lorem ipsum dolor ist samet, Consectetuer aqipiscing elit, sed Diam nonummy nibh euismod tincidunt ut laoreet bla bla bla",
                studies: "School of Rock Ectetuer adipiscing elit, sed dial nonummy nibs euismod incident bla bla bla",
                achievements: "Lorem ipsum dollar sit amen, Consectetuer aqipiscing elit, Sed diam nonummy nibh euismod tincidunt",
                customTitle: "Custom Text- Lorem ipsum dolor sit met, conshctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt",
                youtube: "https://www.youtube.com/@planetgt495",
                createdAt: '2023-07-11',
                updatedAt: '2023-07-11'
            },
            {
                username: 'rosemary',
                email: 'rosemary@gmail.com',
                password: yield bcrypt_1.default.hash("12345678", 12),
                role: 1,
                dob: '1993-12-12',
                interest: JSON.stringify([1, 2]),
                profile: "upload/user/profile/2.jpg",
                highlight: "Guitar@Band",
                address: "Rock Rooms Inc",
                description: "Guitar Skill",
                status: "available",
                genre: JSON.stringify([1, 2]),
                instrument: JSON.stringify([1, 2]),
                phone: "+3912312",
                services: "Distribution on every channel, Promotion on radio and Socail Media, Recording Mixing and Mastering",
                experiences: "Lorem ipsum dolor ist samet, Consectetuer aqipiscing elit, sed Diam nonummy nibh euismod tincidunt ut laoreet bla bla bla",
                studies: "School of Rock Ectetuer adipiscing elit, sed dial nonummy nibs euismod incident bla bla bla",
                achievements: "Lorem ipsum dollar sit amen, Consectetuer aqipiscing elit, Sed diam nonummy nibh euismod tincidunt",
                customTitle: "Custom Text- Lorem ipsum dolor sit met, conshctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt",
                youtube: "https://www.youtube.com/@planetgt495",
                createdAt: '2023-07-11',
                updatedAt: '2023-07-11'
            },
            {
                username: 'john',
                email: 'john@gmail.com',
                password: yield bcrypt_1.default.hash("12345678", 12),
                role: 2,
                dob: '1993-05-12',
                interest: JSON.stringify([1, 2]),
                profile: "upload/user/profile/3.jpg",
                highlight: "Music Band",
                address: "Wembley Stadium",
                description: "Rehearsal with Alessio",
                status: "available",
                genre: JSON.stringify([1, 2]),
                instrument: JSON.stringify([1, 2]),
                phone: "+3912312",
                services: "Distribution on every channel, Promotion on radio and Socail Media, Recording Mixing and Mastering",
                experiences: "Lorem ipsum dolor ist samet, Consectetuer aqipiscing elit, sed Diam nonummy nibh euismod tincidunt ut laoreet bla bla bla",
                studies: "School of Rock Ectetuer adipiscing elit, sed dial nonummy nibs euismod incident bla bla bla",
                achievements: "Lorem ipsum dollar sit amen, Consectetuer aqipiscing elit, Sed diam nonummy nibh euismod tincidunt",
                customTitle: "Custom Text- Lorem ipsum dolor sit met, conshctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt",
                youtube: "https://www.youtube.com/@planetgt495",
                createdAt: '2023-07-11',
                updatedAt: '2023-07-11'
            },
            {
                username: 'jasmine',
                email: 'jasmine@gmail.com',
                password: yield bcrypt_1.default.hash("12345678", 12),
                role: 2,
                dob: '1993-12-09',
                // interest: JSON.stringify([1, 2]),
                highlight: "Music Band",
                address: "Wembley Stadium",
                description: "Rehearsal with Alessio",
                status: "available",
                genre: JSON.stringify([1, 2]),
                instrument: JSON.stringify([1, 2]),
                phone: "+3912312",
                services: "Distribution on every channel, Promotion on radio and Socail Media, Recording Mixing and Mastering",
                experiences: "Lorem ipsum dolor ist samet, Consectetuer aqipiscing elit, sed Diam nonummy nibh euismod tincidunt ut laoreet bla bla bla",
                studies: "School of Rock Ectetuer adipiscing elit, sed dial nonummy nibs euismod incident bla bla bla",
                achievements: "Lorem ipsum dollar sit amen, Consectetuer aqipiscing elit, Sed diam nonummy nibh euismod tincidunt",
                customTitle: "Custom Text- Lorem ipsum dolor sit met, conshctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt",
                youtube: "https://www.youtube.com/@planetgt495",
                createdAt: '2023-07-11',
                updatedAt: '2023-07-11'
            },
            {
                username: 'simon',
                email: 'simon@gmail.com',
                password: yield bcrypt_1.default.hash("12345678", 12),
                // interest: [1, 2, 3],
                dob: '1995-01-12',
                role: 2,
                highlight: "Music Band",
                address: "Wembley Stadium",
                description: "Rehearsal with Alessio",
                status: "available",
                genre: JSON.stringify([1, 2]),
                instrument: JSON.stringify([1, 2]),
                phone: "+3912312",
                services: "Distribution on every channel, Promotion on radio and Socail Media, Recording Mixing and Mastering",
                experiences: "Lorem ipsum dolor ist samet, Consectetuer aqipiscing elit, sed Diam nonummy nibh euismod tincidunt ut laoreet bla bla bla",
                studies: "School of Rock Ectetuer adipiscing elit, sed dial nonummy nibs euismod incident bla bla bla",
                achievements: "Lorem ipsum dollar sit amen, Consectetuer aqipiscing elit, Sed diam nonummy nibh euismod tincidunt",
                customTitle: "Custom Text- Lorem ipsum dolor sit met, conshctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt",
                youtube: "https://www.youtube.com/@planetgt495",
                createdAt: '2023-07-11',
                updatedAt: '2023-07-11'
            },
            {
                username: 'barry',
                email: 'barry@gmail.com',
                password: yield bcrypt_1.default.hash("12345678", 12),
                role: 2,
                dob: '1997-12-12',
                // interest: [1, 2, 3],
                highlight: "Music Band",
                address: "Wembley Stadium",
                description: "Rehearsal with Alessio",
                status: "available",
                genre: JSON.stringify([1, 2]),
                instrument: JSON.stringify([1, 2]),
                phone: "+3912312",
                services: "Distribution on every channel, Promotion on radio and Socail Media, Recording Mixing and Mastering",
                experiences: "Lorem ipsum dolor ist samet, Consectetuer aqipiscing elit, sed Diam nonummy nibh euismod tincidunt ut laoreet bla bla bla",
                studies: "School of Rock Ectetuer adipiscing elit, sed dial nonummy nibs euismod incident bla bla bla",
                achievements: "Lorem ipsum dollar sit amen, Consectetuer aqipiscing elit, Sed diam nonummy nibh euismod tincidunt",
                customTitle: "Custom Text- Lorem ipsum dolor sit met, conshctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt",
                youtube: "https://www.youtube.com/@planetgt495",
                createdAt: '2023-07-11',
                updatedAt: '2023-07-11'
            },
            {
                username: 'lili',
                email: 'lili@gmail.com',
                password: yield bcrypt_1.default.hash("12345678", 12),
                role: 1,
                dob: '1997-12-12',
                // interest: [1, 2, 3],
                highlight: "Music Band",
                address: "Wembley Stadium",
                description: "Rehearsal with Alessio",
                status: "available",
                genre: JSON.stringify([1, 2]),
                instrument: JSON.stringify([1, 2]),
                phone: "+3912312",
                services: "Distribution on every channel, Promotion on radio and Socail Media, Recording Mixing and Mastering",
                experiences: "Lorem ipsum dolor ist samet, Consectetuer aqipiscing elit, sed Diam nonummy nibh euismod tincidunt ut laoreet bla bla bla",
                studies: "School of Rock Ectetuer adipiscing elit, sed dial nonummy nibs euismod incident bla bla bla",
                achievements: "Lorem ipsum dollar sit amen, Consectetuer aqipiscing elit, Sed diam nonummy nibh euismod tincidunt",
                customTitle: "Custom Text- Lorem ipsum dolor sit met, conshctetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt",
                youtube: "https://www.youtube.com/@planetgt495",
                createdAt: '2023-07-11',
                updatedAt: '2023-07-11'
            },
        ], {});
    }),
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants_1.DataBaseTableNames.USER, {}, {});
    }
};
