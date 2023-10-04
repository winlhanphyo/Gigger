import { Router } from "../../custom-router";
import { postController } from "../../../controllers/post";

const router = new Router();

router.get('/', postController.getAllPost);
router.post('/', postController.createPost);
router.get('/:id', postController.detailPost);
router.post('/update/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

router.post('/:id/support', postController.support);

router.get('/top/video/list', postController.userTopVideoList);
router.get('/top/video/:id/random', postController.userRandomTopVideoList);
router.get('/video/list', postController.userVideoList);
router.get('/:id/video/like', postController.likeVideo);
router.get('/:id/video/view', postController.viewVideo);
router.get('/:id/video/unlike', postController.unLikeVideo);

export const postRouter = router;
