import express from "express";
import { genreController } from "../../controllers/genre";

const router = express.Router();

router.get('/', genreController.getAllGenre);

export default router;
