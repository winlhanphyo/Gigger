import { Router } from "../../custom-router";
import { artistController } from "../../../controllers/artist";

const router = new Router();

router.get('/', artistController.getAllArtist);
router.post('/', artistController.createArtist);
router.get('/:id', artistController.detailArtist);
router.post('/update/:id', artistController.updateArtist);
router.post('/:id/video', artistController.createArtistVideo);

export const artistRouter = router;
