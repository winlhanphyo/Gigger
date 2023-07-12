import express from "express";
import { eventController } from "../../controllers/event";
import { interestController } from "../../controllers/interest";

const router = express.Router();

router.get('/', interestController.getAllInterest);

export default router;
