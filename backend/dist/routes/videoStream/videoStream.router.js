"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoStream_1 = require("../../controllers/videoStream");
const router = express_1.default.Router();
router.get('/:filename/stream', videoStream_1.videoStreamController.streamVideo);
router.get('/:filename/download', videoStream_1.videoStreamController.downloadVideo);
exports.default = router;
