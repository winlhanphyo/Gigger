import { Router } from "../../custom-router";
import { eventController } from "../../../controllers/event";

const router = new Router();

router.get('/', eventController.getAllEvent);
router.post('/', eventController.createEvent);

export const eventRouter = router;
