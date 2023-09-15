import { Router } from "../../custom-router";
import { userController } from "../../../controllers/user";
import { postController } from "../../../controllers/post";

const router = new Router();

router.get('/', userController.getAllUser);
router.get('/profile/:id', userController.getUserProfile);
router.get('/profile/:id/like', userController.likeProfile);
router.get('/profile/:id/view', userController.viewProfile);
router.get('/profile/:id/unlike', userController.unLikeProfile);
router.get('/profile/:id/follow', userController.followProfile);
router.get('/profile/:id/unfollow', userController.unFollowProfile);


router.get('/:id/video', postController.getVideoWithUserId);
router.get('/:id', userController.detailUser);

router.get('/top/video/list', userController.userTopVideoList);
router.get('/video/list', userController.userVideoList);
router.get('/video/:id/like', userController.likeVideo);
router.get('/video/:id/view', userController.viewVideo);
router.get('/video/:id/unlike', userController.unLikeVideo);

router.post('/update/:id', userController.updateUser);
router.post('/', userController.createUser);
router.post('/upload/video', userController.createUserVideo);


router.delete('/delete/video/:id', userController.deleteUserVideo);

export const userRouter = router;
