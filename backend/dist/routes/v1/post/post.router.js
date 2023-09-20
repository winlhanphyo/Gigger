"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const custom_router_1 = require("../../custom-router");
const post_1 = require("../../../controllers/post");
const router = new custom_router_1.Router();
router.get('/', post_1.postController.getAllPost);
router.post('/', post_1.postController.createPost);
router.get('/:id', post_1.postController.detailPost);
router.post('/update/:id', post_1.postController.updatePost);
router.delete('/:id', post_1.postController.deletePost);
router.post('/:id/support', post_1.postController.support);
router.get('/top/video/list', post_1.postController.userTopVideoList);
router.get('/video/list', post_1.postController.userVideoList);
router.get('/:id/video/like', post_1.postController.likeVideo);
router.get('/:id/video/view', post_1.postController.viewVideo);
router.get('/:id/video/unlike', post_1.postController.unLikeVideo);
exports.postRouter = router;
