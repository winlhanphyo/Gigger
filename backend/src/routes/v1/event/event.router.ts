import { Router } from "../../custom-router";
import { eventController } from "../../../controllers/event";

const router = new Router();

router.get('/', eventController.getAllEvent);
router.get('/upcoming', eventController.upComingEvent);
router.post('/', eventController.createEvent);
router.get('/:id', eventController.detailEvent);
router.post('/update/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export const eventRouter = router;
