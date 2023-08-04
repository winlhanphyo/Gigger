import { Router } from "../../custom-router";
import { userController } from "../../../controllers/user";

const router = new Router();

router.get('/top/video/list', userController.userTopVideoList);
router.get('/video/list', userController.userVideoList);
router.get('/video/:id/like', userController.likeVideo);
router.get('/video/:id/view', userController.viewVideo);
router.get('/video/:id/unlike', userController.unLikeVideo);
router.post('/upload/video', userController.createUserVideo);
router.delete('/delete/video/:id', userController.deleteUserVideo);

export const userRouter = router;
