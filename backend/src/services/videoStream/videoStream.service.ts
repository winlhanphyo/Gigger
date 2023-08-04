import { USER_VIDEO_PATH } from "../../utils/constant";

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
  streamVideo(req: any, res: any) {
    try {
      const filename = req.params.filename;
      const self = this;
      function handleFile(error: any, file_data: any) {
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
    } catch (e: any) {
      console.log('stream API Error', e.toString());
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * stream video file for open file callback function.
   * @param req 
   * @param res 
   * @param video_file 
   */
  streamVideoFile(req: any, res: any, video_file: any) {
    const path = USER_VIDEO_PATH + req.params.filename;
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

    } else {
      res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
      fs.createReadStream(path).pipe(res);
    }
  }

  /**
   * read video file.
   * @param filename 
   * @param callback 
   */
  getFile(filename: any, callback: any) {
    fs.readFile(path.resolve(USER_VIDEO_PATH + "/", filename), callback);
  }

  /**
   * download video.
   * @param req 
   * @param res 
   */
  async downloadVideoData(req: any, res: any) {
    try {
      const path = USER_VIDEO_PATH + "/" + req.params.filename;
      res.download(path);
    } catch(err: any) {
      console.log('download video file error', err);
    }
  }
}

export const videoStreamService = new VideoStreamService();