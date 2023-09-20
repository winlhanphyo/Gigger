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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const database_1 = require("../../database");
const userLikeViewProfile_model_1 = require("../../database/models/userLikeViewProfile.model");
const constant_1 = require("../../utils/constant");
const utils_1 = require("../../utils/utils");
class UserService {
    /**
     * get users list.
     * @param req
     * @param res
     * @returns
     */
    getUserList(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = Number(req.query.page) || 0;
                const limit = Number(req.query.size) || constant_1.PAGINATION_LIMIT;
                const userList = yield database_1.UserDbModel.findAll({
                    limit,
                    offset,
                    // include: [
                    //   {
                    //     model: VideoDbModel,
                    //     through: { attributes: [] }
                    //   }
                    // ]
                });
                for (let i = 0; i < userList.length; i++) {
                    let genre = (_a = userList[i].dataValues) === null || _a === void 0 ? void 0 : _a.genre;
                    if (genre) {
                        console.log('genre', genre);
                        const genreList = yield database_1.GenreDbModel.findAll({
                            where: {
                                id: genre
                            }
                        });
                        console.log('genreList', genreList);
                        userList[i].dataValues.genre = genreList;
                    }
                    let interest = (_b = userList[i].dataValues) === null || _b === void 0 ? void 0 : _b.interest;
                    if (interest) {
                        const interestList = yield database_1.GenreDbModel.findAll({
                            where: {
                                id: interest
                            }
                        });
                        userList[i].dataValues.interest = interestList;
                    }
                    return res.json({
                        count: userList.length,
                        data: userList
                    });
                }
            }
            catch (e) {
                console.log('------get Artist API Error----', e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * create user.
     * @param req
     * @param res
     * @returns
     */
    createUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let profile = req.body.profile;
                const id = +req.params.id;
                if (((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    profile = req.files.profile[0].path.replaceAll("\\", "/");
                }
                const userData = {
                    username: req.body.username,
                    email: req.body.email,
                    password: yield bcrypt_1.default.hash(req.body.password, 12),
                    role: req.body.role,
                    profile,
                    highlight: req.body.highlight,
                    address: req.body.address,
                    description: req.body.description,
                    status: req.body.status,
                    instrument: req.body.instrument,
                };
                const addUserData = (dist, propName, data) => {
                    let obj = JSON.parse(JSON.stringify(data));
                    if (typeof obj === 'object' && obj !== null) {
                        if ((obj === null || obj === void 0 ? void 0 : obj.hasOwnProperty(propName)) && req.body[propName]) {
                            dist[propName] = obj[propName];
                            if (propName === 'dob') {
                                // Parse the date string using Moment.js
                                const date = (0, moment_1.default)(obj[propName], "YYYY-MM-DD");
                                dist[propName] = date;
                            }
                            else if (propName === "interest") {
                                dist[propName] = JSON.parse(obj[propName]);
                            }
                        }
                    }
                };
                const paramList = ["dob", "interest", "phone", "services", "experiences", "studies", "achievements", "customTitle", "instagram",
                    "youtube", "facebook", "twitter", "tiktok", "website"];
                for (let i = 0; i <= paramList.length; i++) {
                    addUserData(userData, paramList[i], req.body);
                }
                const createUser = yield database_1.UserDbModel.create(Object.assign(Object.assign({}, userData), { createdAt: new Date().toISOString() }));
                return res.json({
                    message: 'User is created successfully',
                    data: createUser
                });
            }
            catch (e) {
                console.log("Create User API Error", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * update User data.
     * @param req
     * @param res
     */
    updateUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const checkUser = yield this.getUserDataWithId(id, res);
                if (!checkUser) {
                    return res.status(404).json({
                        msg: "User is not found"
                    });
                }
                const userData = {
                    username: req.body.username,
                    email: req.body.email,
                    password: yield bcrypt_1.default.hash(req.body.password, 12),
                    role: req.body.role,
                    name: req.body.name,
                    highlight: req.body.highlight,
                    address: req.body.address,
                    description: req.body.description,
                    status: req.body.status,
                    instrument: req.body.instrument,
                    updatedAt: new Date().toISOString()
                };
                const addUserData = (dist, propName, data) => {
                    let obj = JSON.parse(JSON.stringify(data));
                    if (typeof obj === 'object' && obj !== null) {
                        if ((obj === null || obj === void 0 ? void 0 : obj.hasOwnProperty(propName)) && req.body[propName]) {
                            dist[propName] = obj[propName];
                            if (propName === 'dob') {
                                // Parse the date string using Moment.js
                                const date = (0, moment_1.default)(obj[propName], "YYYY-MM-DD");
                                dist[propName] = date;
                            }
                        }
                    }
                };
                const paramList = ["dob", "interest", "phone", "services", "experiences", "studies", "achievements", "customTitle", "instagram",
                    "youtube", "facebook", "twitter", "tiktok", "website"];
                for (let i = 0; i <= paramList.length; i++) {
                    addUserData(userData, paramList[i], req.body);
                }
                console.log('userData', userData);
                let profile = req.body.profile;
                if (((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    profile = req.files.profile[0].path.replace("\\", "/");
                    if (checkUser.profile && checkUser.profile != profile) {
                        (0, utils_1.deleteFile)(checkUser.profile);
                    }
                    if (checkUser) {
                        userData.profile = profile;
                    }
                }
                userData.id = +req.params.id;
                const updateUser = yield database_1.UserDbModel.update(userData, {
                    where: { id: userData.id }
                });
                console.log('updateUser', updateUser);
                return updateUser;
            }
            catch (e) {
                console.log("Create User API Error", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * delete user.
     * @param req
     * @param res
     * @returns
     */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const detailUser = yield database_1.UserDbModel.findOne({
                    where: {
                        id
                    }
                });
                if (!detailUser) {
                    return res.status(400).json({
                        msg: "User is not found by this id"
                    });
                }
                const removeUserData = yield database_1.UserDbModel.destroy({
                    where: {
                        id
                    },
                });
                return res.json({
                    message: `Delete User is successful.`,
                    data: removeUserData
                });
            }
            catch (e) {
                console.log("Delete User API Error", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * get User by Id.
     * @param req
     * @param res
     * @returns
     */
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const userData = yield this.getUserDataWithId(id, res);
                return res.json({
                    data: userData
                });
            }
            catch (e) {
                console.log("--Get User By Id API Error---", e);
                return res.status(400).json({
                    msg: e.toString(),
                });
            }
        });
    }
    /**
     * get user profile.
     * @param req
     * @param res
     * @returns
     */
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const userData = yield this.getUserDataWithId(id, res);
                const getCountData = (id, status) => __awaiter(this, void 0, void 0, function* () {
                    const count = yield userLikeViewProfile_model_1.UserLikeViewProfileDbModel.count({
                        where: {
                            artistId: id,
                            status
                        }
                    });
                    return count;
                });
                // like and view follow count for profile.
                if (userData) {
                    const likeCount = yield getCountData(userData.dataValues.id, "like");
                    userData.dataValues.likeCount = this.formatNumber(likeCount);
                    const viewCount = yield getCountData(userData.dataValues.id, "view");
                    userData.dataValues.viewCount = this.formatNumber(viewCount);
                    const followCount = yield getCountData(userData.dataValues.id, "follow");
                    userData.dataValues.followCount = this.formatNumber(followCount);
                }
                return res.json({
                    data: userData
                });
            }
            catch (e) {
                console.log("--Get User By Id API Error---", e);
                return res.status(400).json({
                    msg: e.toString(),
                });
            }
        });
    }
    /**
     * add status profile (for user's profile like and view)
     * @param userLikeViewProfileData
     * @param res
     * @returns
     */
    addStatusUserProfile(userLikeViewProfileData, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.getUserDataWithId(userLikeViewProfileData.artistId, res);
                if (!profile) {
                    res.status(400).json({
                        msg: "User Profile is not found by this id"
                    });
                }
                const count = yield userLikeViewProfile_model_1.UserLikeViewProfileDbModel.count({
                    where: {
                        artistId: userLikeViewProfileData.artistId,
                        userId: parseInt(userLikeViewProfileData.userId),
                        status: userLikeViewProfileData.status
                    }
                });
                if (count > 0) {
                    return res.json({
                        message: `User already ${userLikeViewProfileData.status} this profile`,
                    });
                }
                const createLikeViewProfile = yield userLikeViewProfile_model_1.UserLikeViewProfileDbModel.create(Object.assign(Object.assign({}, userLikeViewProfileData), { createdAt: new Date().toISOString() }));
                return res.json({
                    message: `Add Profile ${userLikeViewProfileData.status} Status is successful.`,
                    data: createLikeViewProfile
                });
            }
            catch (e) {
                console.log(`------Add Profile Status Error----`, e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * remove profile status.
     * @param userId
     * @param artistId
     * @param status
     * @param res
     * @returns
     */
    removeStatusUserProfile(userId, artistId, status, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = this.getUserDataWithId(artistId, res);
                if (!profile) {
                    res.status(400).json({
                        msg: "Profile is not found by this id"
                    });
                }
                const removeLikeViewProfile = yield userLikeViewProfile_model_1.UserLikeViewProfileDbModel.destroy({
                    where: {
                        userId,
                        artistId,
                        status
                    },
                });
                return res.json({
                    message: `Remove User Profile ${status} Status is successful.`,
                    data: removeLikeViewProfile
                });
            }
            catch (e) {
                console.log('------Remove User Profile Status Error----', e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * get user data with id.
     * @param id
     * @param res
     * @returns
     */
    getUserDataWithId(id, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield database_1.UserDbModel.findOne({
                    where: {
                        id
                    }
                });
                console.log('user data', userData);
                if (!userData) {
                    return res.status(404).json({
                        msg: "User data is not found by this id"
                    });
                }
                let genre = (_a = userData.dataValues) === null || _a === void 0 ? void 0 : _a.genre;
                if (genre) {
                    const genreList = yield database_1.GenreDbModel.findAll({
                        where: {
                            id: genre
                        }
                    });
                    userData.dataValues.genre = genreList;
                }
                let interest = (_b = userData.dataValues) === null || _b === void 0 ? void 0 : _b.interest;
                if (interest) {
                    const interestList = yield database_1.GenreDbModel.findAll({
                        where: {
                            id: interest
                        }
                    });
                    userData.dataValues.interest = interestList;
                }
                return userData;
            }
            catch (e) {
                console.log("--Get User By Id API Error---", e);
                return res.status(400).json({
                    msg: e.toString(),
                });
            }
        });
    }
    /**
     * format number like 20K, 1M.
     * @param num
     * @returns
     */
    formatNumber(num) {
        if (typeof num !== 'number') {
            return "Invalid Input";
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        else {
            return num.toString();
        }
    }
    /**
     * account verify after user signup.
     * @param req
     * @param res
     */
    verifyAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const checkUser = yield this.getUserDataWithId(id, res);
                if (!checkUser) {
                    return res.status(404).json({
                        msg: "User is not found"
                    });
                }
                const param = {
                    verifyAccount: true
                };
                console.log('checkUser', checkUser);
                const response = yield database_1.UserDbModel.update(param, { where: { id }, });
                console.log('response', id, response);
                return res.json({ "message": "Account Verification Successfully" });
            }
            catch (e) {
                console.log("Verify Account API Error", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
}
exports.userService = new UserService();
