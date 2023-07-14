import { Router } from "../../custom-router";
import { eventController } from "../../../controllers/event";

const router = new Router();

router.get('/', eventController.getAllEvent);
router.post('/', eventController.createEvent);
router.get('/:id', eventController.detailEvent);
router.post('/update/:id', eventController.updateEvent);

export const eventRouter = router;
