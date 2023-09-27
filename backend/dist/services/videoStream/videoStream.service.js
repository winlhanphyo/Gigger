"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoStreamService = void 0;
const constant_1 = require("../../utils/constant");
const path = require('path');
const fs = require('fs');
const http = require('http');
// const nodeFetch = require('node-fetch');
class VideoStreamService {
    /**
     * stream video.
     * @param filename
     * @returns
     */
    streamVideo(req, res) {
        try {
            const filename = req.params.filename;
            const self = this;
            function handleFile(error, file_data) {
                if (error) {
                    if (error.code === 'ENOENT') {
                        return res.status(404).json({
                            error: 'No such file found'
                        });
                    }
                    return res.json(error);
                }
                self.streamVideoFile(req, res, file_data);
            }
            this.getFile(filename, handleFile);
        }
        catch (e) {
            console.log('stream API Error', e.toString());
            return res.status(400).json({
                message: e.toString()
            });
        }
    }
    /**
     * stream video file for open file callback function.
     * @param req
     * @param res
     * @param video_file
     */
    streamVideoFile(req, res, video_file) {
        const path = constant_1.USER_VIDEO_PATH + req.params.filename;
        const total = video_file.length;
        var range = req.headers.range;
        if (range) {
            var positions = range.replace(/bytes=/, "").split("-");
            var start = parseInt(positions[0], 10);
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end - start) + 1;
            res.writeHead(206, {
                "Content-Range": "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4"
            });
            res.end(video_file.slice(start, end + 1), "binary");
        }
        else {
            res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
            fs.createReadStream(path).pipe(res);
        }
    }
    /**
     * read video file.
     * @param filename
     * @param callback
     */
    getFile(filename, callback) {
        fs.readFile(path.resolve(constant_1.USER_VIDEO_PATH + "/", filename), callback);
    }
    /**
     * download video.
     * @param req
     * @param res
     */
    downloadVideoData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const path = constant_1.USER_VIDEO_PATH + "/" + req.params.filename;
                res.download(path);
            }
            catch (err) {
                console.log('download video file error', err);
            }
        });
    }
}
exports.videoStreamService = new VideoStreamService();
