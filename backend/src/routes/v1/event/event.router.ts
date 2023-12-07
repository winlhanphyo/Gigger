import { Router } from "../../custom-router";
import { eventController } from "../../../controllers/event";

const router = new Router();

router.post('/update/:id', eventController.updateEvent);
router.get('/upcoming', eventController.upComingEvent);
// router.get('/user/:id', eventController.getOtherUserEvent);
router.get('/:id', eventController.detailEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/', eventController.getAllEvent);
router.post('/', eventController.createEvent);

export const eventRouter = router;
