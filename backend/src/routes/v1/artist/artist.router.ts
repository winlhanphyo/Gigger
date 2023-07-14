import { Router } from "../../custom-router";
import { artistController } from "../../../controllers/artist";

const router = new Router();

router.get('/', artistController.getAllArtist);
router.post('/', artistController.createArtist);
router.get('/:id', artistController.detailArtist);
router.post('/update/:id', artistController.updateArtist);

export const artistRouter = router;
