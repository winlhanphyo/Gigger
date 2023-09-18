import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { userService } from '../../services/user';

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
    const response = await userService.removeStatusUserProfile(userId, artistId, "follow", res);
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
}

export const userController = new UserController();