"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genre_1 = require("../../controllers/genre");
const router = express_1.default.Router();
router.get('/', genre_1.genreController.getAllGenre);
exports.default = router;
