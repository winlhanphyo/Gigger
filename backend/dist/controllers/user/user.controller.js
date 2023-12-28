"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.userController = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const user_1 = require("../../services/user");
const constant_1 = require("../../utils/constant");
const sequelize_1 = require("sequelize");
let UserController = class UserController {
    /**
     * get all user data.
     * @param req
     * @param res
     * @returns
     */
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(req.query.page) - 1 || 0;
            const size = Number(req.query.size) || constant_1.PAGINATION_LIMIT;
            let page = offset * size;
            let otherFindOptions = undefined;
            let condition = {};
            const username = req.query.username;
            const email = req.query.email;
            const genre = req.query.genre;
            const highlight = req.query.highlight; // for role in UI
            const instrument = req.query.instrument;
            const role = req.query.role;
            const status = req.query.status; // for available
            username ? condition.username = username : null;
            email ? condition.email = email : null;
            username ? condition.username = {
                [sequelize_1.Op.like]: `%${username}%`,
            } : null;
            email ? condition.email = {
                [sequelize_1.Op.like]: `%${email}%`,
            }
                : null;
            genre ? condition.genre = genre : null;
            highlight ? condition.highlight = {
                [sequelize_1.Op.like]: `%${highlight}%`,
            }
                : null;
            instrument ? condition.instrument = instrument : null;
            role ? condition.role = role : null;
            status ? condition.status = status : null;
            // when date and time
            // place
            // radius eg. 25km
            otherFindOptions = {
                where: condition
            };
            const user = yield user_1.userService.getUserList(undefined, otherFindOptions, page, size, res);
            return user;
        });
    }
    /**
     * get User profile
     * @param req
     * @param res
     */
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.userService.getUserProfile(req, res);
            return user;
        });
    }
    /**
     * like User profile
     * @param req
     * @param res
     */
    likeProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVideoData = {
                userId: req.headers['userid'],
                artistId: req.params.id,
                status: "like"
            };
            const response = yield user_1.userService.addStatusUserProfile(userVideoData, res);
            return response;
        });
    }
    /**
      * view User profile
      * @param req
      * @param res
      */
    viewProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVideoData = {
                userId: req.headers['userid'],
                artistId: req.params.id,
                status: "view"
            };
            const response = yield user_1.userService.addStatusUserProfile(userVideoData, res);
            return response;
        });
    }
    /**
     * follow User profile
     * @param req
     * @param res
     */
    followProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVideoData = {
                userId: req.headers['userid'],
                artistId: req.params.id,
                status: "follow"
            };
            const response = yield user_1.userService.addStatusUserProfile(userVideoData, res);
            return response;
        });
    }
    /**
     * unlike User Profile.
     * @param req
     * @param res
     * @returns
     */
    unLikeProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistId = req.params.id;
            const userId = req.headers['userid'];
            const response = yield user_1.userService.removeStatusUserProfile(userId, artistId, "like", res);
            return response;
        });
    }
    /**
     * unFollow User Profile.
     * @param req
     * @param res
     * @returns
     */
    unFollowProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistId = req.params.id;
            const userId = req.headers['userid'];
            const response = yield user_1.userService.removeStatusUserProfile(userId, artistId, "follow", res);
            return response;
        });
    }
    /**
     * create user.
     * @param req
     * @param res
     * @returns
     */
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.userService.createUser(req, res);
            return result;
        });
    }
    /**
     * update User.
     * @param req
     * @param res
     * @returns
     */
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserData = yield user_1.userService.updateUser(req, res);
            return updateUserData;
        });
    }
    /**
    * delete event.
    * @param req
    * @param res
    */
    deleteUser(req, res) {
        const data = user_1.userService.deleteUser(req, res);
        return data;
    }
    /**
     * user Detail
     * @param req
     * @param res
     */
    detailUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield user_1.userService.getUserById(req, res);
            return userData;
        });
    }
};
UserController = __decorate([
    autobind_decorator_1.default
], UserController);
exports.userController = new UserController();
