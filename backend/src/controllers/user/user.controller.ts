import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { userService } from '../../services/user';
import { IVideoModel, VideoDbModel } from '../../database';

@autobind
class UserController {

  /**
   * get all user data.
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllUser(req: Request, res: Response) {
    const user = await userService.getUserList(req, res);
    return user;
  }

  /**
   * get User profile
   * @param req 
   * @param res 
   */
  async getUserProfile(req: Request, res: Response) {
    const user = await userService.getUserProfile(req, res);
    return user;
  }

  /**
   * like User profile
   * @param req 
   * @param res 
   */
  async likeProfile(req: Request, res: Response) {
    const userVideoData = {
      userId: req.headers['userid'],
      artistId: req.params.id,
      status: "like"
    };
    const response = await userService.addStatusUserProfile(userVideoData, res);
    return response;
  }

  /**
    * view User profile
    * @param req 
    * @param res 
    */
  async viewProfile(req: Request, res: Response) {
    const userVideoData = {
      userId: req.headers['userid'],
      artistId: req.params.id,
      status: "view"
    };
    const response = await userService.addStatusUserProfile(userVideoData, res);
    return response;
  }

  /**
   * follow User profile
   * @param req 
   * @param res 
   */
  async followProfile(req: Request, res: Response) {
    const userVideoData = {
      userId: req.headers['userid'],
      artistId: req.params.id,
      status: "follow"
    };
    const response = await userService.addStatusUserProfile(userVideoData, res);
    return response;
  }

  /**
   * unlike User Profile.
   * @param req 
   * @param res 
   * @returns 
   */
  async unLikeProfile(req: Request, res: Response) {
    const artistId = req.params.id;
    const userId = req.headers['userid'];
    const response = await userService.removeStatusUserProfile(userId, artistId, "like", res);
    return response;
  }

  /**
   * unFollow User Profile.
   * @param req 
   * @param res 
   * @returns 
   */
  async unFollowProfile(req: Request, res: Response) {
    const artistId = req.params.id;
    const userId = req.headers['userid'];
    const response = await userService.removeStatusVideo(userId, artistId, "follow", res);
    return response;
  }


  /**
   * create user.
   * @param req 
   * @param res 
   * @returns 
   */
  async createUser(req: Request, res: Response) {
    const result = await userService.createUser(req, res);
    return result;
  }

  /**
   * update User.
   * @param req 
   * @param res 
   * @returns 
   */
  async updateUser(req: any, res: Response) {
    const updateUserData = await userService.updateUser(req, res);
    return updateUserData;
  }

  /**
  * delete event.
  * @param req 
  * @param res 
  */
  deleteUser(req: any, res: any) {
    const data = userService.deleteUser(req, res);
    return data;
  }

  /**
   * user Detail
   * @param req 
   * @param res 
   */
  async detailUser(req: Request, res: Response) {
    const userData = await userService.getUserById(req, res);
    return userData;
  }

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
    const video = userService.topVideoList(req, res);
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