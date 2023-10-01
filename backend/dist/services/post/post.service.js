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
exports.postService = void 0;
const path_1 = __importDefault(require("path"));
const database_1 = require("../../database");
const userLikeViewPost_model_1 = require("../../database/models/userLikeViewPost.model");
const constant_1 = require("../../utils/constant");
const utils_1 = require("../../utils/utils");
const supportPayment_model_1 = require("../../database/models/supportPayment.model");
class PostService {
    constructor() {
        /**
         * delete file data.
         * @param data
         * @param dataPath
         */
        this.deleteFileData = (data, dataPath) => {
            if (data) {
                const rootDir = path_1.default.join(__dirname, "../../" + dataPath);
                const filePath = path_1.default.join(rootDir, data);
                (0, utils_1.deleteFile)(filePath);
            }
        };
    }
    /**
     * get posts list.
     * @param postAttributes
     * @param otherFindOptions
     * @returns
     */
    getPostList(postAttributes, otherFindOptions, offset, limit, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                limit = limit && limit > 0 ? limit : undefined;
                let postList = yield database_1.PostDbModel.findAll(Object.assign(Object.assign({}, otherFindOptions), { attributes: postAttributes, limit,
                    offset, include: [
                        {
                            model: database_1.UserDbModel,
                            as: "createdByUser"
                        },
                        {
                            model: database_1.UserDbModel,
                            as: "updatedByUser"
                        }
                    ] }));
                for (let i = 0; i < postList.length; i++) {
                    let music = JSON.parse((_a = postList[i].dataValues) === null || _a === void 0 ? void 0 : _a.music);
                    if (music) {
                        console.log('music', music);
                        const interestList = yield database_1.GenreDbModel.findAll({
                            where: {
                                id: music
                            }
                        });
                        console.log('interestList', interestList);
                        postList[i].dataValues.music = interestList;
                    }
                }
                return res.json({
                    count: postList.length,
                    data: postList
                });
            }
            catch (e) {
                console.log('------get post list API error----', e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * create post data.
     * @param postObj
     * @returns
     */
    createPost(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let video = "";
                let filename = "";
                const userId = req.headers['userid'];
                const checkVideoCount = yield this.getVideoByUserId(userId);
                console.log('checkVideoCount', (_a = checkVideoCount[0]) === null || _a === void 0 ? void 0 : _a.dataValues);
                if ((checkVideoCount === null || checkVideoCount === void 0 ? void 0 : checkVideoCount.length) > 0 && ((_e = (_d = (_c = (_b = checkVideoCount[0]) === null || _b === void 0 ? void 0 : _b.dataValues) === null || _c === void 0 ? void 0 : _c.createdByUser) === null || _d === void 0 ? void 0 : _d.dataValues) === null || _e === void 0 ? void 0 : _e.user_role)
                    && ((_l = (_k = (_j = (_h = (_g = (_f = checkVideoCount[0]) === null || _f === void 0 ? void 0 : _f.dataValues) === null || _g === void 0 ? void 0 : _g.createdByUser) === null || _h === void 0 ? void 0 : _h.dataValues) === null || _j === void 0 ? void 0 : _j.user_role) === null || _k === void 0 ? void 0 : _k.dataValues) === null || _l === void 0 ? void 0 : _l.name)) {
                    const role = (_s = (_r = (_q = (_p = (_o = (_m = checkVideoCount[0]) === null || _m === void 0 ? void 0 : _m.dataValues) === null || _o === void 0 ? void 0 : _o.createdByUser) === null || _p === void 0 ? void 0 : _p.dataValues) === null || _q === void 0 ? void 0 : _q.user_role) === null || _r === void 0 ? void 0 : _r.dataValues) === null || _s === void 0 ? void 0 : _s.name;
                    if (role === "Free Account" && (checkVideoCount === null || checkVideoCount === void 0 ? void 0 : checkVideoCount.length) > 9) {
                        return res.json({
                            message: `Free User Account uploaded only 9 videos.`,
                        });
                    }
                    else if (role === "Pro Account" && (checkVideoCount === null || checkVideoCount === void 0 ? void 0 : checkVideoCount.length) > 30) {
                        return res.json({
                            message: `Pro User Account uploaded only 30 videos`
                        });
                    }
                }
                const postObj = {
                    caption: req.body.caption,
                    music: JSON.parse(req.body.music),
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    advertisementFormat: req.body.advertisementFormat,
                    searchResult: req.body.searchResult,
                    giglistClassifieds: req.body.giglistClassifieds,
                    targetAudience: req.body.targetAudience,
                    privateContent: req.body.privateContent,
                    memberShipContent: req.body.memberShipContent,
                    forMyFollowersOnly: req.body.forMyFollowersOnly,
                    createdUser: req.headers['userid']
                };
                if (((_u = (_t = req.files) === null || _t === void 0 ? void 0 : _t.video) === null || _u === void 0 ? void 0 : _u.length) > 0) {
                    console.log('video', (_v = req.files.video[0]) === null || _v === void 0 ? void 0 : _v.path);
                    video = (_x = (_w = req.files.video[0]) === null || _w === void 0 ? void 0 : _w.path) === null || _x === void 0 ? void 0 : _x.split("\\").join("/");
                    const splitFileName = video.split("/");
                    console.log('split file name', splitFileName);
                    filename = splitFileName[splitFileName.length - 1];
                    console.log('filename', filename);
                    postObj.video = filename;
                }
                let thumbnail = req.body.thumbnail;
                if (((_z = (_y = req.files) === null || _y === void 0 ? void 0 : _y.thumbnail) === null || _z === void 0 ? void 0 : _z.length) > 0) {
                    thumbnail = (_0 = req.files.thumbnail[0].path) === null || _0 === void 0 ? void 0 : _0.split("\\").join("/");
                    postObj.thumbnail = thumbnail;
                }
                const createPost = yield database_1.PostDbModel.create(Object.assign(Object.assign({}, postObj), { createdAt: new Date().toISOString() }));
                return res.json({
                    message: 'Post is created successfully',
                    data: createPost
                });
            }
            catch (e) {
                console.log("-----Create Post API error----", e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * update Post data.
     * @param req
     * @param res
     */
    updatePost(req, res) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                let video = "";
                let filename = "";
                const detailPost = yield exports.postService.getPostById(id);
                if (!detailPost) {
                    return res.status(404).send("Post is not found");
                }
                const postObj = {
                    caption: req.body.caption,
                    music: JSON.parse(req.body.music),
                    // address: req.body.address,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    advertisementFormat: req.body.advertisementFormat,
                    searchResult: req.body.searchResult,
                    giglistClassifieds: req.body.giglistClassifieds,
                    targetAudience: req.body.targetAudience,
                    privateContent: req.body.privateContent,
                    memberShipContent: req.body.memberShipContent,
                    forMyFollowersOnly: req.body.forMyFollowersOnly,
                    postId: req.body.postId,
                    updatedUser: req.headers['userid'],
                    updatedAt: new Date().toISOString()
                };
                postObj.id = +req.params.id;
                if (((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.video) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    if ((_c = detailPost === null || detailPost === void 0 ? void 0 : detailPost.dataValues) === null || _c === void 0 ? void 0 : _c.video) {
                        this.deleteFileData(detailPost.dataValues.video, constant_1.USER_VIDEO_PATH);
                    }
                    video = (_d = req.files.video[0].path) === null || _d === void 0 ? void 0 : _d.split("\\").join("/");
                    const splitFileName = video.split("/");
                    filename = splitFileName[splitFileName.length - 1];
                    postObj.video = filename;
                }
                let thumbnail = req.body.thumbnail;
                if (((_f = (_e = req.files) === null || _e === void 0 ? void 0 : _e.thumbnail) === null || _f === void 0 ? void 0 : _f.length) > 0) {
                    thumbnail = (_g = req.files.thumbnail[0].path) === null || _g === void 0 ? void 0 : _g.split("\\").join("/");
                    if (detailPost.thumbnail) {
                        this.deleteFileData(detailPost.dataValues.thumbnail, constant_1.USER_THUMBNAIL_PATH);
                    }
                    if (detailPost) {
                        detailPost.thumbnail = thumbnail;
                    }
                }
                const updatePostData = yield database_1.PostDbModel.update(postObj, {
                    where: { id: postObj.id }
                });
                return res.json({
                    message: 'Post is updated successfully',
                    data: updatePostData
                });
            }
            catch (e) {
                console.log('------update post error----', e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * get Post by Id.
     * @param post_id
     * @returns
     */
    getPostById(post_id, res = null) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = yield database_1.PostDbModel.findOne({
                    where: {
                        id: post_id
                    },
                    include: [
                        {
                            model: database_1.UserDbModel,
                            as: "createdByUser"
                        },
                        {
                            model: database_1.UserDbModel,
                            as: "updatedByUser"
                        }
                    ]
                });
                console.log('Post Data', postData);
                let music = JSON.parse((_a = postData.dataValues) === null || _a === void 0 ? void 0 : _a.music);
                if (music) {
                    const interestList = yield database_1.GenreDbModel.findAll({
                        where: {
                            id: music
                        }
                    });
                    postData.dataValues.music = interestList;
                }
                if (!postData) {
                    return res.status(404).json({
                        message: "Post data is not found by this id"
                    });
                }
                if (res) {
                    return res.json({
                        data: postData
                    });
                }
                else {
                    return postData;
                }
            }
            catch (e) {
                console.log("--Get Post By Id API Error---", e);
                if (res) {
                    return res.status(400).json({
                        message: e.toString()
                    });
                }
                else {
                    return null;
                }
            }
        });
    }
    /**
     * get Video With UserId.
     * @param req
     * @param res
     */
    getVideoWithUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const videoList = yield this.getVideoByUserId(id);
                return res.json({
                    count: videoList.length,
                    data: videoList
                });
            }
            catch (e) {
                console.log('------get video list with UserId API error----', e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
   * get video by user id.
   * @param id
   * @returns
   */
    getVideoByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.PostDbModel.findAll({
                include: [
                    {
                        model: database_1.UserDbModel,
                        as: "createdByUser",
                        where: { id },
                        include: [
                            {
                                model: database_1.UserRoleDbModel,
                                as: "user_role",
                            }
                        ]
                    }
                ]
            });
            return user;
        });
    }
    /**
     * delete post.
     * @param req
     * @param res
     * @returns
     */
    deletePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userId = req.headers["userid"];
                const detailPost = yield this.getPostById(id);
                if (!detailPost) {
                    return res.status(400).json({
                        message: "Post is not found by this id"
                    });
                }
                if ((_a = detailPost === null || detailPost === void 0 ? void 0 : detailPost.dataValues) === null || _a === void 0 ? void 0 : _a.video) {
                    this.deleteFileData(detailPost.dataValues.video, constant_1.USER_VIDEO_PATH);
                }
                const removePostData = yield database_1.PostDbModel.destroy({
                    where: {
                        id
                    },
                });
                return res.json({
                    message: `Delete Post is successful.`,
                    data: removePostData
                });
            }
            catch (e) {
                console.log("Delete Post API Error", e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * add status video (for user's video like and view)
     * @param userLikeViewPostData
     * @param res
     * @returns
     */
    addStatusVideo(userLikeViewPostData, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const video = yield this.getPostById(userLikeViewPostData.postId);
                if (!video) {
                    res.status(400).json({
                        message: "User Post is not found by this id"
                    });
                }
                const count = yield userLikeViewPost_model_1.UserLikeViewPostDbModel.count({
                    where: {
                        postId: userLikeViewPostData.postId,
                        userId: parseInt(userLikeViewPostData.userId),
                        status: userLikeViewPostData.status
                    }
                });
                if (count > 0) {
                    return res.json({
                        message: `User already ${userLikeViewPostData.status} this video`,
                    });
                }
                const createLikeViewVideo = yield userLikeViewPost_model_1.UserLikeViewPostDbModel.create(Object.assign(Object.assign({}, userLikeViewPostData), { createdAt: new Date().toISOString() }));
                return res.json({
                    message: `Add Vido ${userLikeViewPostData.status} Status is successful.`,
                    data: createLikeViewVideo
                });
            }
            catch (e) {
                console.log(`------Add Video Status Error----`, e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * remove video status.
     * @param userId
     * @param postId
     * @param status
     * @param res
     * @returns
     */
    removeStatusVideo(userId, postId, status, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const video = this.getPostById(postId);
                if (!video) {
                    res.status(400).json({
                        message: "Video is not found by this id"
                    });
                }
                const removeLikeViewVideo = yield userLikeViewPost_model_1.UserLikeViewPostDbModel.destroy({
                    where: {
                        userId,
                        postId,
                        status
                    },
                });
                return res.json({
                    message: `Remove Video ${status} Status is successful.`,
                    data: removeLikeViewVideo
                });
            }
            catch (e) {
                console.log('------Remove Video Status Error----', e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * top User video list by pagination.
     * @param req
     * @param res
     * @returns
     */
    topVideoList(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.headers['userid'];
                const userData = yield database_1.UserDbModel.findOne({
                    where: {
                        id: userId
                    }
                });
                let limit = Number(req.query.size) || constant_1.PAGINATION_LIMIT;
                let offset = Number(req.query.page) - 1 || 0;
                let page = offset * limit;
                let condition = {};
                if (((_a = userData === null || userData === void 0 ? void 0 : userData.dataValues) === null || _a === void 0 ? void 0 : _a.interest) > 0) {
                    condition = {
                        genre: userData.dataValues.interest
                    };
                }
                const allVideoCount = yield database_1.PostDbModel.count({
                    include: [
                        {
                            model: database_1.UserDbModel,
                            as: "createdByUser",
                            where: condition
                        }
                    ]
                });
                const count = allVideoCount - (limit * (offset + 1));
                console.log('all Video count', allVideoCount);
                let postList = yield this.getVideoForTop(limit, page, condition);
                console.log('postList', postList);
                if (allVideoCount < count) {
                    limit = limit - postList.length;
                    offset = (count - allVideoCount) / limit;
                    const prePostId = (_b = postList === null || postList === void 0 ? void 0 : postList.dataValues) === null || _b === void 0 ? void 0 : _b.map((data) => data.id);
                    condition = {
                        id: { $ne: prePostId }
                    };
                    let nextPostList = yield this.getVideoForTop(limit, offset, condition);
                    postList = [...postList, ...nextPostList];
                }
                // like and view count for video.
                if ((postList === null || postList === void 0 ? void 0 : postList.length) > 0) {
                    for (let i = 0; i < postList.length; i++) {
                        const likeCount = yield userLikeViewPost_model_1.UserLikeViewPostDbModel.count({
                            where: {
                                postId: postList[i].dataValues.id,
                                status: 'like'
                            }
                        });
                        postList[i].dataValues.likeCount = this.formatNumber(likeCount);
                        const viewCount = yield userLikeViewPost_model_1.UserLikeViewPostDbModel.count({
                            where: {
                                postId: postList[i].dataValues.id,
                                status: 'view'
                            }
                        });
                        postList[i].dataValues.viewCount = this.formatNumber(viewCount);
                    }
                }
                return res.json({
                    data: postList,
                    count: postList.length
                });
            }
            catch (e) {
                console.log('------Video List API Error----', e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * get Video For Home Page.
     * @param limit
     * @param offset
     * @param condition
     * @returns
     */
    getVideoForTop(limit, offset, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postList = yield database_1.PostDbModel.findAll({
                    limit,
                    offset,
                    include: [
                        {
                            model: database_1.UserDbModel,
                            as: "createdByUser",
                            // where: { id },
                            include: [
                                {
                                    model: database_1.UserRoleDbModel,
                                    as: "user_role",
                                }
                            ]
                        }
                    ]
                });
                return postList;
            }
            catch (err) {
                console.log('get Video For Top API Error', err);
                return null;
            }
        });
    }
    /**
     * video list by pagination.
     * @param req
     * @param res
     * @returns
     */
    videoList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = Number(req.query.size) || constant_1.PAGINATION_LIMIT;
                let offset = Number(req.query.page) - 1 || 0;
                let page = (offset * limit) || 0;
                const postList = yield database_1.PostDbModel.findAll({
                    limit,
                    offset: page,
                    include: [
                        {
                            model: database_1.UserDbModel,
                            as: "createdByUser"
                        }
                    ]
                });
                // like and view count for video.
                if ((postList === null || postList === void 0 ? void 0 : postList.length) > 0) {
                    for (let i = 0; i < postList.length; i++) {
                        const likeCount = yield userLikeViewPost_model_1.UserLikeViewPostDbModel.count({
                            where: {
                                postId: postList[i].dataValues.id,
                                status: 'like'
                            }
                        });
                        postList[i].dataValues.likeCount = this.formatNumber(likeCount);
                        const viewCount = yield userLikeViewPost_model_1.UserLikeViewPostDbModel.count({
                            where: {
                                postId: postList[i].dataValues.id,
                                status: 'view'
                            }
                        });
                        postList[i].dataValues.viewCount = this.formatNumber(viewCount);
                    }
                }
                return res.json({
                    data: postList,
                    count: postList.length
                });
            }
            catch (e) {
                console.log('------Video List API Error----', e);
                return res.status(400).json({
                    message: e.toString()
                });
            }
        });
    }
    /**
     * support the post.
     * @param req
     * @param res
     */
    support(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = req.body;
                const userId = req.headers['userid'];
                const id = +req.params.id;
                let productList = [
                    {
                        price_data: {
                            currency: "EUR",
                            product_data: {
                                donatorId: userId,
                                postId: id
                            },
                            unit_amount: param.amount,
                        },
                        // quantity: 1,
                    }
                ];
                // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
                // const domainUrl = param.domainUrl;
                // delete param?.domainUrl;
                // const domainUrl = orderData.domainUrl;
                // delete orderData?.domainUrl;
                const dist = {
                    donatorId: Number(userId),
                    postId: id,
                    message: param.message,
                    amount: param.amount,
                    paymentDone: true
                };
                console.log('---------dist', dist);
                const result = yield this.paymentCreate(dist);
                console.log('order result', result.dataValues.id);
                // const session = await stripe.checkout.sessions.create({
                //   payment_method_types: ["card"],
                //   line_items: productList,
                //   mode: "payment",
                //   payment_intent_data: {
                //     metadata: {
                //       paymentId: param.paymentId,
                //     },
                //   },
                //   // shipping_address_collection: {
                //   //   allowed_countries: ['US', 'SG', "IT"],
                //   // },
                //   // custom_text: {
                //   //   shipping_address: {
                //   //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
                //   //   },
                //   //   submit: {
                //   //     message: 'We\'ll email you instructions on how to get started.',
                //   //   },
                //   // },
                //   // success_url: domainUrl + "/payment/success",
                //   // cancel_url: domainUrl + "/payment/cancel",
                // });
                // return res.json({ id: session.id });
                return res.json({ msg: "Payment success" });
                // res.json(session);
            }
            catch (err) {
                console.log('Stripe API Error', err);
                throw err.toString();
            }
        });
    }
    /**
     * payment create data.
     * @param param
     */
    paymentCreate(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const createPost = yield supportPayment_model_1.SupportPaymentDbModel.create(Object.assign(Object.assign({}, param), { createdAt: new Date().toISOString() }));
            return createPost;
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
}
exports.postService = new PostService();
