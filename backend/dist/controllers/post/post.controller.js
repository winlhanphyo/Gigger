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
exports.postController = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const post_1 = require("../../services/post");
const constant_1 = require("../../utils/constant");
let PostController = class PostController {
    /**
     * get all posts data.
     * @param req
     * @param res
     * @returns
     */
    getAllPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(req.query.page) - 1 || 0;
            const size = Number(req.query.size) || constant_1.PAGINATION_LIMIT;
            let page = offset * size;
            const response = yield post_1.postService.getPostList(undefined, undefined, page, size, res);
            return response;
        });
    }
    /**
     * create Post.
     * @param req
     * @param res
     */
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_1.postService.createPost(req, res);
            return result;
        });
    }
    /**
     * update Post.
     * @param req
     * @param res
     * @returns
     */
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePostData = yield post_1.postService.updatePost(req, res);
            return updatePostData;
        });
    }
    /**
     * post Detail
     * @param req
     * @param res
     */
    detailPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const postData = yield post_1.postService.getPostById(id, res);
            return postData;
        });
    }
    /**
   * delete post video.
   * @param req
   * @param res
   */
    deletePost(req, res) {
        const data = post_1.postService.deletePost(req, res);
        return data;
    }
    /**
   * user video list for home page.
   * @param req
   * @param res
   */
    userTopVideoList(req, res) {
        const video = post_1.postService.topVideoList(req, res);
        return video;
    }
    /**
     * user video list.
     * @param req
     * @param res
     */
    userVideoList(req, res) {
        const video = post_1.postService.videoList(req, res);
        return video;
    }
    getVideoWithUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoList = yield post_1.postService.getVideoWithUserId(req, res);
            return videoList;
        });
    }
    /**
     * get all events data.
     * @param req
     * @param res
     * @returns
     */
    likeVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVideoData = {
                userId: req.headers['userid'],
                postId: req.params.id,
                status: "like"
            };
            const response = yield post_1.postService.addStatusVideo(userVideoData, res);
            return response;
        });
    }
    /**
     * view Video.
     * @param req
     * @param res
     */
    viewVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVideoData = {
                userId: req.headers['userid'],
                postId: req.params.id,
                status: "view"
            };
            const response = yield post_1.postService.addStatusVideo(userVideoData, res);
            return response;
        });
    }
    /**
     * unlike Video.
     * @param req
     * @param res
     * @returns
     */
    unLikeVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.id;
            const userId = req.headers['userid'];
            const response = yield post_1.postService.removeStatusVideo(userId, postId, "like", res);
            return response;
        });
    }
    support(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield post_1.postService.support(req, res);
            return response;
        });
    }
};
PostController = __decorate([
    autobind_decorator_1.default
], PostController);
exports.postController = new PostController();
