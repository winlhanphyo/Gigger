import autobind from 'autobind-decorator';
import { videoStreamService } from "../../services/videoStream/videoStream.service";


@autobind
class VideoStreamController {

  /**
   * stream video file.
   * @param req 
   * @param res 
   * @returns 
   */
  streamVideo(req: any, res: any) {
    return videoStreamService.streamVideo(req, res);
  }

  /**
   * download video.
   * @param req 
   * @param res 
   * @returns 
   */
  async downloadVideo(req: any, res: any) {
    const video = await videoStreamService.downloadVideoData(req, res);
    return video;
  }

}

export const videoStreamController = new VideoStreamController();