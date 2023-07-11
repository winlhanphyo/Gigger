import { Router } from "../../custom-router";

import { interestController } from "../../../controllers/interest";

const router = new Router();

router.get('/', interestController.getAllInterest);

export const interestRouter = router;
