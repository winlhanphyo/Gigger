import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { userService } from '../../services/user';
import { PAGINATION_LIMIT } from '../../utils/constant';
import { Op } from 'sequelize';

@autobind
class UserController {

  /**
   * get all user data.
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllUser(req: Request, res: Response) {
    let offset = Number(req.query.page) - 1 || 0;
    const size = Number(req.query.size) || PAGINATION_LIMIT;
    let page = offset * size;
    let otherFindOptions: any = undefined;
    let condition: any = {};
    const username = req.query.username;
    const email = req.query.email;
    const genre = req.query.genre;
    const highlight = req.query.highlight; // for role in UI
    const instrument = req.query.instrument;
    const role = req.query.role;
    const status = req.query.status; // for available

    username ? condition.username = username : null;
    email ? condition.email = email : null;

    username ? condition.username = {
      [Op.like]: `%${username}%`,
    } : null;
    email ? condition.email = {
      [Op.like]: `%${email}%`,
    }
    : null;

    genre ? condition.genre = genre : null;
    highlight ? condition.highlight = {
      [Op.like]: `%${highlight}%`,
    }
    : null;
    instrument ? condition.instrument = instrument : null;
    role ? condition.role = role : null;
    status ? condition.status = status : null;
    // when date and time
    // place
    // radius eg. 25km

    otherFindOptions = {
      where: condition
    };
    console.log('-------before user service------------');
    const user = await userService.getUserList(undefined, otherFindOptions, page, size, res);
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