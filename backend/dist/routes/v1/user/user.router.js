"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const custom_router_1 = require("../../custom-router");
const user_1 = require("../../../controllers/user");
const post_1 = require("../../../controllers/post");
const router = new custom_router_1.Router();
router.get('/', user_1.userController.getAllUser);
router.get('/profile/:id', user_1.userController.getUserProfile);
router.get('/profile/:id/like', user_1.userController.likeProfile);
router.get('/profile/:id/view', user_1.userController.viewProfile);
router.get('/profile/:id/unlike', user_1.userController.unLikeProfile);
router.get('/profile/:id/follow', user_1.userController.followProfile);
router.get('/profile/:id/unfollow', user_1.userController.unFollowProfile);
router.get('/:id/video', post_1.postController.getVideoWithUserId);
router.get('/:id', user_1.userController.detailUser);
// router.get('/top/video/list', userController.userTopVideoList);
// router.get('/video/list', userController.userVideoList);
// router.get('/video/:id/like', userController.likeVideo);
// router.get('/video/:id/view', userController.viewVideo);
// router.get('/video/:id/unlike', userController.unLikeVideo);
router.post('/update/:id', user_1.userController.updateUser);
router.delete('/:id', user_1.userController.deleteUser);
router.post('/', user_1.userController.createUser);
// router.post('/upload/video', userController.createUserVideo);
// router.delete('/delete/video/:id', userController.deleteUserVideo);
exports.userRouter = router;
