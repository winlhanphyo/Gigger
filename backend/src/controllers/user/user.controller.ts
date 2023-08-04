import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { userService } from '../../services/user';
import { IVideoModel, VideoDbModel } from '../../database';

@autobind
class UserController {

  /**
   * get all events data.
   * @param req 
   * @param res 
   * @returns 
   */
  async likeVideo(req: Request, res: Response) {
    const userVideoData = {
      userId: req.headers['userid'],
      videoId: req.params.id,
      status: "like"
    };
    const response = await userService.addStatusVideo(userVideoData, res);
    return response;
  }

  /**
   * view Video.
   * @param req 
   * @param res 
   */
  async viewVideo(req: Request, res: Response) {
    const userVideoData = {
      userId: req.headers['userid'],
      videoId: req.params.id,
      status: "view"
    };
    const response = await userService.addStatusVideo(userVideoData, res);
    return response;
  }

  /**
   * unlike Video.
   * @param req 
   * @param res 
   * @returns 
   */
  async unLikeVideo(req: Request, res: Response) {
    const videoId = req.params.id;
    const userId = req.headers['userid'];
    const response = await userService.removeStatusVideo(userId, videoId, "like", res);
    return response;
  }

  /**
   * upload user video.
   * @param req 
   * @param res 
   * @returns 
   */
  async createUserVideo(req: any, res: Response) {
    try {
      const result = await userService.createUserVideo(req, res);
      return result;
    } catch (err) {
      console.log('-------Upload User Video Error---------');
      console.log(err);
    }
  }

  /**
   * user video list for home page.
   * @param req 
   * @param res 
   */
  userTopVideoList(req: any, res: Response) {
    const video = userService.videoList(req, res);
    return video;
  }

  /**
   * user video list.
   * @param req 
   * @param res 
   */
  userVideoList(req: any, res: Response) {
    const video = userService.videoList(req, res);
    return video;
  }

  /**
   * delete user video.
   * @param req 
   * @param res 
   */
  deleteUserVideo(req: any, res: any) {
    const deleteVideo = userService.deleteVideo(req, res);
    return deleteVideo;
  }
}

export const userController = new UserController();